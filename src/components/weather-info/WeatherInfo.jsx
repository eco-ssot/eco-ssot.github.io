import { useGetWeatherByIdQuery } from '../../services/weather';
import { toFormattedNumber } from '../../utils/number';

export default function WeatherInfo() {
  const { data } = useGetWeatherByIdQuery();
  return (
    <>
      <div className="block truncate">
        T & H : {toFormattedNumber(data?.main?.temp)} ºC / {toFormattedNumber(data?.main?.humidity)}%
      </div>
    </>
  );
}
