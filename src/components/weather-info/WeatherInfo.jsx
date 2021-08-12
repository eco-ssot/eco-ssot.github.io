import { useGetWeatherByIdQuery } from '../../services/weather';
import { toFormattedNumber } from '../../utils/number';

export default function WeatherInfo() {
  const { data } = useGetWeatherByIdQuery();
  return (
    <>
      <div className="block truncate">溫度：{toFormattedNumber(data?.main?.temp)} ºC</div>
      <div className="block truncate">濕度：{toFormattedNumber(data?.main?.humidity)} %</div>
    </>
  );
}
