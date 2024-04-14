'use client'

import axios from "@/services/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [currencyCodes, setCurrencyCodes] = useState<string[]>();
  const [convertRate, setConvertRate] = useState<number>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues
  } = useForm()

  const formData = getValues();

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await axios.get('/codes');

        if (response.status !== 200) {
          console.error('Unexpected status code:', response.status);
        }

        const { supported_codes } = response.data
        const codes = supported_codes.map((code: any) => code[0])
        setCurrencyCodes(codes);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchCurrency()
  }, [])

  const onSubmit = async (data: any) => {
    const { baseCurrency, toCurrency } = data;

    const response = await axios.get(`/pair/${baseCurrency}/${toCurrency}`)
    const { conversion_rate: conversionRate } = response.data;
    setConvertRate(conversionRate);
  }


  return (
    <main className="flex gap-5">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="base-currency">
          <h3>Base Currency</h3>
          <select
            className="flex flex-col gap-5 text-black"
            {...register("baseCurrency", { required: true })}
          >
            {currencyCodes?.map((currency: any) => (
              <option className="text-black">{currency}</option>
            ))}
          </select>
        </div>

        <div className="base-currency">
          <h3>Convert to</h3>
          <select
            className="flex flex-col gap-5 text-black"
            {...register("toCurrency", { required: true })}
          >
            {currencyCodes?.map((currency: any) => (
              <option className="text-black">{currency}</option>
            ))}
          </select>
        </div>
        <button type="submit">Convert</button>
      </form>

      {
        convertRate &&
        <div>
          <span>1 {formData.baseCurrency} </span>
          <span>is equals to </span>
          <span>{convertRate}</span>
          <span>{formData.toCurrency}</span>
        </div>
      }
    </main>
  );
}
