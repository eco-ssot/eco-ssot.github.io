import { useEffect, useState } from 'react';
import { get } from 'lodash';

import { useGetWeatherByIdQuery } from '../../services/weather';

export default function WeatherInfo() {
  const [weather, setWeather] = useState({ temp: '-', humidity: '-' });
  const { data } = useGetWeatherByIdQuery();
  useEffect(() => {
    setWeather(get(data, 'main', { temp: '-', humidity: '-' }));
  }, [data]);

  return (
    <>
      <div>溫度：{weather.temp} ºC</div>
      <div>濕度：{weather.humidity} %</div>
    </>
  );
}
