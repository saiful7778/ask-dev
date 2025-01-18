import { useCallback } from "react";
import { FormControl } from "./shadcn/ui/form";
import { cn } from "@/lib/shadcn/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn/ui/avatar";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { MAX_IMAGE_SIZE } from "@/lib/staticData";
import { type FileRejection, useDropzone } from "react-dropzone";
import { ControllerRenderProps } from "react-hook-form";

interface AvatarUploadProps {
  field: ControllerRenderProps<
    {
      userName: string;
      profileName: string;
      avatar?: File | null | undefined;
    },
    "avatar"
  >;
  setError: (message: string) => void;
  disabled: boolean;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  field,
  setError,
  disabled,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      field.onChange(acceptedFiles[0]);
      setError("");
    },
    [field, setError],
  );

  const onDropRejected = useCallback(
    (rejectedFiles: FileRejection[]) => {
      let errorName = "";

      switch (rejectedFiles[0].errors[0].code) {
        case "file-too-large":
          errorName = "Selected file is too big.";
          break;
        case "file-invalid-type":
          errorName = "Invalid file type.";
          break;
        default:
          errorName = "Something went wrong";
          break;
      }

      setError(errorName);
    },
    [setError],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      onDropRejected,
      accept: {
        "image/png": [".png"],
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
      },
      maxSize: MAX_IMAGE_SIZE,
      multiple: false,
      maxFiles: 1,
      disabled,
    });

  const removeImage = () => {};

  return (
    <FormControl>
      <div
        className={cn(
          "group relative size-[150px] cursor-pointer overflow-hidden rounded-full border",
          isDragActive && "border-sky-500 bg-sky-800",
          isDragReject && "border-red-500 bg-red-800",
        )}
        {...getRootProps()}
      >
        {field.value && typeof field.value === "string" ? (
          <>
            <Avatar className="size-full">
              <AvatarImage src={field.value} alt="user image" />
              <AvatarFallback />
            </Avatar>
            <AvatarDeleteBtn removeImage={removeImage} disabled={disabled} />
          </>
        ) : field.value instanceof File ? (
          <>
            <Image
              width={150}
              height={150}
              src={URL.createObjectURL(field.value)}
              className="size-full object-cover object-center"
              alt="user image"
            />
            <AvatarDeleteBtn removeImage={removeImage} disabled={disabled} />
          </>
        ) : (
          <div className="absolute left-1/2 top-1/2 inline-flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-secondary">
            <Pencil className="size-[50%]" />
          </div>
        )}
        <input {...getInputProps()} />
      </div>
    </FormControl>
  );
};

const AvatarDeleteBtn: React.FC<{
  removeImage: () => void;
  disabled: boolean;
}> = ({ removeImage, disabled }) => (
  <>
    <div className="absolute inset-0 size-full bg-secondary opacity-0 duration-200 group-hover:opacity-40"></div>
    <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          removeImage();
        }}
        disabled={disabled}
        className="inline-flex size-8 items-center justify-center rounded-full bg-destructive opacity-0 duration-200 group-hover:opacity-100"
        type="button"
      >
        <Trash2 className="size-[50%]" />
      </button>
    </div>
  </>
);

export default AvatarUpload;
