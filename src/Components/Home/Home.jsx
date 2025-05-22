import React, { useEffect, useState } from 'react';
import Slider from '../Slider/Slider';
import NewPlants from '../NewPlants/NewPlants';
import { useLoaderData } from 'react-router';
import Loader from '../Loader/Loader';
import PlantCareTips from '../PlantCareTips/PlantCareTips';

const Home = () => {
    const [plants, setPlants] = useState([]);
      const [loading, setLoading] = useState(true);
    const data = useLoaderData();

    useEffect(() => {
        setPlants(data);
        setTimeout(() => {
            
            setLoading(false)
        }, 200);
    }, [data]);

    if (loading) {
      return <Loader />;
    }

    return (
      <div className="w-full min-h-[calc(100vh-64px)]">
        <Slider className="z-10 " />
        <NewPlants plants={plants} />
        <PlantCareTips />
      </div>
    );
};

export default Home;