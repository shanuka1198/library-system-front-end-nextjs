
import { useState } from "react";

export default function DeletePopup() {

    return (
        <div className="flex items-center justify-center min-h-screen">

            <button>
                Delete Item
            </button>

            {/* Popup Modal */}

                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">
                            Are you sure you want to delete?
                        </h2>
                        <div className="flex justify-end space-x-4">
                            <button
                            >
                                Cancel
                            </button>
                            <button
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

        </div>
    );
}
