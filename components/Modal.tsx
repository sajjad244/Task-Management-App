"use client";

import {ReactNode} from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({isOpen, onClose, children}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        {children}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="text-red-600 hover:underline text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
