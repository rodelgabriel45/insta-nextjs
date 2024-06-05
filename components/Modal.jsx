/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';

import { FaCamera } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { BiSolidCloudUpload } from 'react-icons/bi';
import { RiImageEditFill } from 'react-icons/ri';

import app from '@/lib/firebase';

const Modal = ({ open, onClose }) => {
  const [img, setImg] = useState(null);
  const [enteredCaption, setEnteredCaption] = useState('');
  const [fileToUpload, setFileToUpload] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    caption: '',
  });
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef();

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileToUpload(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadImage = async () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + '-' + fileToUpload.name;
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, fileToUpload);

    setImageUploading(true);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress.toFixed(0));
      },
      (error) => {
        setImageUploading(false);
        setFileToUpload(null);
        setImg(null);
        toast.error(`Error in uploading image: ${error.message || error}`);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({
            ...formData,
            image: downloadUrl,
          });
          setImageUploading(false);
          toast.success('Image Uploaded Successfully');
        });
      }
    );
  };

  console.log(formData);

  return (
    <>
      <div
        className='fixed top-0 left-0 w-[100%] h-screen bg-[#000000BF] z-index: 20;'
        onClick={onClose}
      />

      <div className='flex flex-col min-h-screen justify-center items-center'>
        <motion.dialog
          className='max-w-lg w-[90%] p-6 py-10  bg-white border-2 rounded-md shadow-md'
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          open={open}
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col justify-center items-center h-[100%]'>
              {img && (
                <div className='relative group/image'>
                  <img
                    src={img}
                    alt='selected image'
                    className='w-full mx-auto h-full object-contain rounded group-hover/image:brightness-50 group-hover/image:opacity-50'
                  />
                  <div
                    className='absolute opacity-0 cursor-pointer hover:scale-110 transition transform duration-75 ease-in-out text-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group-hover/image:opacity-100'
                    onClick={() => fileInputRef.current.click()}
                  >
                    <RiImageEditFill className='text-blue-800' />
                  </div>
                </div>
              )}

              {imageUploading && (
                <Spinner aria-label='Default status example' className='mb-2' />
              )}

              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', duration: 0.3 }}
                className='cursor-pointer'
              >
                <input
                  type='file'
                  onChange={handleImgChange}
                  accept='image/*'
                  hidden
                  ref={fileInputRef}
                />

                {img ? (
                  <BiSolidCloudUpload
                    onClick={handleUploadImage}
                    className='text-gray-400 text-4xl'
                    hidden={imageUploading}
                  />
                ) : (
                  <FaCamera
                    className='text-gray-400 text-3xl'
                    onClick={() => fileInputRef.current.click()}
                  />
                )}
              </motion.div>
              <input
                type='text'
                maxLength='150'
                className='text-sm m-4 p-2 text-center w-full focus:ring-0 outline-none border-b '
                placeholder='Enter your caption...'
              />
            </div>
            <motion.button
              type='submit'
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className='w-full bg-green-600 text-white p-2 text-sm shadow-md rounded-md disabled:opacity-80'
            >
              Upload Post
            </motion.button>
          </form>

          <div
            onClick={onClose}
            className='cursor-pointer absolute top-2 right-2 border rounded-full border-red-500 text-xs p-1 hover:text-white hover:bg-red-500'
          >
            <IoClose />
          </div>
        </motion.dialog>
      </div>
    </>
  );
};

export default Modal;
