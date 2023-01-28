// Import the Cloudinary classes. 
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import Image, {} from 'next/image';

// const myImage = new CloudinaryImage('sample', {cloudName: 'fastbeetech'});
const myImage = (image: string) => new CloudinaryImage(image, {cloudName: 'fastbeetech'}).resize(fill().width(250).height(250));


  // Render the image in a React component.
  const UploadImage = ({image}) => {
    return ( 
        <>
        <Image src={image.url} width={image.width} height={image.height} alt={image.name}/>
      </>
     );
  }
   
  export default UploadImage;
  return (
   
  )