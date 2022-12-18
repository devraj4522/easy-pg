import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect } from 'react';
import PGCard from './PGCard';
import './SlideShow.css';

export const SlideShow = () => {
  const colors = [
    'https://www.thejazminn.com/wp-content/uploads/2015/08/Earth-G1-Living-815x458.jpg',
    'https://www.thejazminn.com/wp-content/uploads/2015/08/Metal-1-living-815x458.jpg',
    'https://www.thejazminn.com/wp-content/uploads/2015/08/Wood-G3-Living-815x458.jpg',
    'https://is1-2.housingcdn.com/01c16c28/71ddb6275b1bad377144bf06479ed900/v0/fs/3_bhk_villa-for-sale-whitefield-Bangalore-bedroom.jpg',
  ];
  const city = ['Banglore', 'Kolkata', 'Delhi', 'Pune'];
  const delay = 2500;

  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {colors.map((c, index) => (
          <Card
            elevation={0}
            className="slide"
            key={index}
            sx={{
              background: `url(${c})`,
            }}
          >
            <CardContent
              sx={{
                backgroundColor: '#61517d69',
                color: '#fff',
                textAlign: 'center',
                position: 'absolute',
                width: '100%',
                bottom: 0,
              }}
            >
              <Typography variant="h6">{city[index]}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? ' active' : ''}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
