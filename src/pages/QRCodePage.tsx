import { ChangeEvent } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setValue } from '../features/qr/qrSlice';

export default function QRCodePage() {
  const dispatch = useAppDispatch();
  const qrValue = useAppSelector((state) => state.qr.value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setValue(e.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">QRCode 產生器 (使用 Redux)</h1>
      <input
        type="text"
        value={qrValue}
        placeholder="輸入要轉成 QRCode 的內容"
        onChange={handleChange}
        className="border-2 border-gray-300 p-2 rounded-lg mb-4 w-full max-w-md"
      />
      {qrValue && (
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <QRCodeCanvas value={qrValue} size={200} />
        </div>
      )}
    </div>
  );
}
