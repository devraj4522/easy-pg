import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { viewPost } from '../redux/actions/postActions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ImageSlider from '../components/ImageSlider';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import KitchenIcon from '@mui/icons-material/Kitchen';
import TvIcon from '@mui/icons-material/Tv';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import KingBedIcon from '@mui/icons-material/KingBed';
// import GoogleMapComponent from '../components/GoogleMapComponent';
import AddressMap from '../components/AddressMap';
import { Threebox } from 'threebox-plugin';

const ViewPostByIdScreen = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const { current_post } = useSelector((state) => state.posts?.viewPost);

  useEffect(() => {
    dispatch(viewPost(params.id));
  }, [dispatch, params.id]);

  const loadLocations = (map, coords) => {
    console.log('load');
    let truck;

    map.addLayer({
      id: 'mapmapmap',
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (map, mbxContext) {
        window.tb = new Threebox(map, mbxContext, { defaultLights: true });

        var options = {
          obj: '/pill/scene.gltf',
          type: 'gltf',
          scale: 20,
          units: 'meters',
          anchor: 'center',
          rotation: { x: 90, y: 180, z: 0 }, //default rotation
        };

        for (let i = 0; i < coords.length; i++) {
          console.log(coords);
          const coord = coords[i];
          window.tb.loadObj(options, function (model) {
            console.log('placing');
            truck = model.setCoords([coord.long, coord.lat]);
            window.tb.add(truck);
            let rotation = 0;
            function animate() {
              setTimeout(function () {
                requestAnimationFrame(animate);
              }, 1000 / 20);
              truck.setRotation({ x: 0, y: 0, z: (rotation += 10) });
            }

            animate();
          });
        }
      },
      render: function (gl, matrix) {
        window.tb.update();
      },
    });
  };

  const locations = [
    { lat: 22.5726, long: 88.3639 },
    { lat: 22.5726, long: -117.1616766 },
    { lat: 32.7256001, long: -117.1616203 },
    { lat: 32.7256001, long: -117.1616203 },
  ];

  if (!current_post) return null;
  return (
    <>
      <Box sx={{ m: 2, mx: 'auto', maxWidth: '1250px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ImageSlider images={current_post.media} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2 }}>
              <Typography variant="caption" gutterBottom>
                <b>Created At :</b>{' '}
                {dayjs(current_post.createdAt).format('hh:mm A, DD MMM YYYY')}
              </Typography>
              <Typography variant="h4" gutterBottom>
                {current_post.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Address: </b> {current_post.address}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Allowed Gender: </b> {current_post.gender}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Meals on Weekdays : </b>{' '}
                {current_post.meal?.weekdays?.join(', ')}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Meals on Weekends : </b>{' '}
                {current_post.meal?.weekends?.join(', ')}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Meals Type : </b> {current_post.meal?.options}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Maintenance</b> : {current_post.maintenance}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Gate Open Timings</b> : {current_post.gateOpen}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Gate Close Timings</b> : {current_post.gateClose}
              </Typography>
              <Stack sx={{ mt: 2 }}>
                {current_post.types?.map((type) => (
                  <>
                    <Typography variant="h4" gutterBottom key={type}>
                      ₹{type.price}/
                      <Typography variant="overline" gutterBottom key={type}>
                        {type.share} person room
                      </Typography>
                    </Typography>
                  </>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 5,
            height: 348,
            p: 4,
            backgroundColor: '#5255a9c4',
            color: 'white',
            borderRadius: 5,
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            Amenities Available:
          </Typography>
          <Grid container spacing={4} sx={{ my: 2, position: 'relative' }}>
            {current_post.amenities?.laundry && (
              <Grid item md={1}>
                <LocalLaundryServiceIcon sx={{ fontSize: '2rem' }} />
              </Grid>
            )}
            {current_post.amenities?.refrigirator && (
              <Grid item md={1}>
                <KitchenIcon sx={{ fontSize: '2rem' }} />
              </Grid>
            )}
            {current_post.amenities?.tv && (
              <Grid item md={1}>
                <TvIcon sx={{ fontSize: '2rem' }} />
              </Grid>
            )}
            {current_post.amenities?.wifi && (
              <Grid item md={1}>
                <NetworkWifiIcon sx={{ fontSize: '2rem' }} />
              </Grid>
            )}
            {current_post.amenities?.bed && (
              <Grid item md={1}>
                <KingBedIcon sx={{ fontSize: '3rem' }} />
              </Grid>
            )}

            <Grid item md={1}>
              <Typography variant="h6" gutterBottom sx={{ mt: 0 }}>
                Contact Numbers:
              </Typography>
              <Typography variant="h6" gutterBottom sx={{}}>
                {current_post.contact?.map((number) => number + ' ')}
              </Typography>
            </Grid>
            <Grid item md={6}>
              <AddressMap
                mapLoad={(map) => {
                  setTimeout(() => {
                    window.map = map;
                    loadLocations(map, locations);
                  }, 2000);
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ViewPostByIdScreen;
