"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCryptoData } from "@/store/slices/cryptoSlice";
import CryptoSection from "@/components/crypto/CryptoSection";

const DEFAULT_CRYPTOS = ["bitcoin", "ethereum", "cardano"];

export default function CryptoPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: cryptoData, loading: cryptoLoading } = useSelector(
    (state: RootState) => state.crypto
  );

  useEffect(() => {
    dispatch(fetchCryptoData(DEFAULT_CRYPTOS));
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Cryptocurrency</h1>
      <CryptoSection data={cryptoData} loading={cryptoLoading} />
    </div>
  );
}
