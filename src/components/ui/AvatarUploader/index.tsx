"use client";
import Image from "next/image";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import Cropper from "react-easy-crop";
import Dropzone from "react-dropzone";
import { Area } from "react-easy-crop";
import getCroppedImg from "./cropImage";
import AppContext from "@/providers/context";
import { useTelegram } from "@/providers/telegram";
import { Button, Spacer, Preloader } from "@/components";
import styles from "./style.module.scss";
import { infoUser, updateUser } from "@/api";
import toast from "react-hot-toast";
import clsx from "clsx";

export const AvatarUploader = ({
  username,
  outerImageSrc,
  callBack,
}: {
  username?: string;
  outerImageSrc?: string | null;
  callBack?: (url: string) => void;
}) => {
  const { isRegistered } = useContext(AppContext);
  const { user } = useTelegram();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [updating, setUpdating] = useState(false);

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleImageUpload = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setIsCropping(true);
    };
  };

  const triggerFileSelect = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const updateAvatar = async (image: string) => {
    if (username && user) {
      setUpdating(true);
      const data = {
        username,
        avatar: "",
      };
      const base64url = await fetch(image)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          return new Promise((res) => {
            reader.onloadend = () => {
              res(reader.result);
            };
          });
        });
      data.avatar = base64url as string;
      updateUser(user.id, data).then(() => {
        setUpdating(false);
        toast.success("The profile has been updated!", {
          id: "profile_update",
          position: "top-center",
        });
      });
    }
  };

  const showCroppedImage = useCallback(async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
        setCroppedImage(croppedImg);
        setIsCropping(false);
        setZoom(1);

        // REGISTER
        callBack && callBack(croppedImg);

        // ACCOUNT
        updateAvatar(croppedImg);
      } catch (e) {
        console.error(e);
      }
    }
  }, [imageSrc, croppedAreaPixels]);

  // useEffect(() => {
  //   if (user) {
  //     infoUser(user.id).then((data: UserInfoProps) => {
  //       if (
  //         data.avatarLink &&
  //         !data.avatarLink.includes("null") &&
  //         !data.avatarLink !== null
  //       ) {
  //         setCroppedImage(data.avatarLink);
  //       } else {
  //         if (isRegistered) {
  //           setCroppedImage("/icons/spinner-color.svg");
  //         }
  //       }
  //     });
  //   }
  // }, [user]);

  useEffect(() => {
    if (outerImageSrc) {
      setCroppedImage(outerImageSrc);
      updateAvatar(outerImageSrc);
    }
  }, [outerImageSrc]);

  return (
    <>
      {updating && <Preloader className={styles.account_preloader} />}
      <div className={styles.avatar}>
        <input
          type="file"
          accept="image/*"
          ref={inputFileRef}
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleImageUpload(Array.from(e.target.files));
            }
          }}
        />
        {!isCropping && (
          <Dropzone
            multiple={false}
            onDrop={handleImageUpload}
            accept={{ "image/*": [] }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps({ className: "dropzone" })}
                className={styles.avatar__box}
              >
                <input {...getInputProps()} />
                <div className={styles.avatar__box_image}>
                  {croppedImage ? (
                    <img
                      src={croppedImage}
                      alt="Cropped Avatar"
                      className={styles.avatar__box_image_preview}
                    />
                  ) : (
                    <Image
                      src={"/icons/camera-icon.svg"}
                      width={40}
                      height={40}
                      alt="avatar"
                      className={styles.avatar__box_image_icon}
                    />
                  )}
                </div>
                <button className={styles.avatar__box_button}>
                  <Image
                    src="/icons/pen-icon.svg"
                    width={20}
                    height={20}
                    alt="edit"
                  />{" "}
                  Edit
                </button>
              </div>
            )}
          </Dropzone>
        )}

        {imageSrc && isCropping && (
          <div
            className={clsx(
              styles.avatar__crop,
              username && styles.avatar__crop_alt
            )}
          >
            <Spacer space={40} />
            <h2 className={styles.avatar__crop_title}>Crop Your Avatar</h2>
            <Spacer space={30} />
            <div className={styles.avatar__crop_area}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                showGrid={false}
              />
            </div>
            <div className={styles.avatar__crop_actions}>
              <Button
                variant="filled"
                size="medium"
                textColor={"var(--button-text-primary)"}
                bgColor={"var(--button-bg-primary)"}
                onClick={showCroppedImage}
                radius={0}
              >
                Apply
              </Button>
              <Button
                variant="outlined"
                size="medium"
                textColor={"var(--button-bg-primary)"}
                bgColor={"var(--button-bg-primary)"}
                onClick={triggerFileSelect}
                radius={0}
              >
                Select Different Image
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
