'use client';

import { useDropzone } from '@uploadthing/react';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { generateClientDropzoneAccept } from 'uploadthing/client';

import { Button } from '@/components/ui/button';
import { convertFileToUrl } from '@/lib/utils';

type FileUploaderProps = {
  imageUrl: string;
  onFieldChange: (url: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className='flex flex-center flex-col bg-dark-3 h-72 cursor-pointer overflow-hidden rounded-xl bg-grey-50'
    >
      <input {...getInputProps()} className='cursor-pointer' />
      {imageUrl ? (
        <div className='flex flex-1 justify-center h-full w-full'>
          <img
            src={imageUrl}
            alt='image'
            width={250}
            height={250}
            className='w-full object-cover object-center'
          />
        </div>
      ) : (
        <div className='flex-center flex-col py-5 text-grey-500'>
          <img
            src='/assets/icons/upload.svg'
            alt='file upload'
            width={77}
            height={77}
          />
          <h3 className='my-2'>Drag photo here</h3>
          <p className='p-medium-12 mb-4'>SVG, PNG, JPG</p>
          <Button type='button' className='rounded-full'>
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
