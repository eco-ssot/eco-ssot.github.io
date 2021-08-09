import { useEffect, useState } from 'react';
import { get } from 'lodash';

import { useGetWeatherByIdQuery } from '../../services/weather';
import { toFormattedNumber } from '../../utils/number';

export default function WeatherInfo() {
  const [weather, setWeather] = useState({});
  const { data } = useGetWeatherByIdQuery();
  useEffect(() => {
    const main = get(data, 'main');
    if (main) {
      setWeather(main);
    }
  }, [data]);

  return (
    <>
      <div>溫度：{toFormattedNumber(weather.temp)} ºC</div>
      <div>濕度：{toFormattedNumber(weather.humidity)} %</div>
    </>
  );
}
