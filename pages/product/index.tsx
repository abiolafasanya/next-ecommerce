import React from 'react';
import Container from '../../components/Container';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Image from 'next/image';

const slides = [
  {
    url:
      'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'This is Good',
  },
  {
    url:
      'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'This is Nice',
  },
  {
    url:
      'https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'This is Awesome',
  },
  {
    url:
      'https://images.pexels.com/photos/3843257/pexels-photo-3843257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'This is Exeburant',
  },
  {
    url:
      'https://images.pexels.com/photos/5003441/pexels-photo-5003441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'This is Fancy',
  },
];
const index = () => {
  return (
    <Container>
      <header className="h-1/2 w-full">
        <Slide indicators >
          {slides.map((each, index) => (
            <>
              <div key={index}>
                <div
                  className="backdrop:opacity-50"
                  style={{ ...divStyle, backgroundImage: `url(${each.url})` }}
                >
                  <span
                    style={spanStyle}
                    className="text-2xl font-semibold bg-black/20 text-white shadow-sm"
                  >
                    Slide {' '} {index + 1}
                  </span>
                </div>
              </div>
            </>
          ))}
        </Slide>
      </header>
    </Container>
  );
};

const spanStyle = {
  padding: '20px',
  // width: '50vw',
  // height: '50vh',
  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
  // background: '#efefef',
};

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '500px',
  backgroundPosition: 'center',
};

export default index;
