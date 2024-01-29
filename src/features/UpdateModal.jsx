import { useState } from 'react';
import Modal from '../components/Modal'
import axios from 'axios';
import { IoCloseOutline } from "react-icons/io5";
import { toast } from 'react-toastify';

const UpdateModal = ({ handleHideModalUpdate }) => {
    const [description, setDescription] = useState("");
    const [nominal, setNominal] = useState("");
    const [type, setType] = useState("");

    const statusOptions = [
        {
            label: "Pemasukkan",
            value: "revenue"
        },
        {
            label: "Pengeluaran",
            value: "expense"
        },
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const reqData = {
            description,
            value: nominal,
            type,
            UserId: import.meta.env.VITE_API_USER_ID
        }

        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/v1/activities`, reqData).then(() => {
            toast.success("Sukses Update Data", {
                autoClose: 3000
            });
            handleHideModalUpdate();
        }).catch(() => {
            toast.error("Something Wrong", {
                autoClose: 3000
            });
        })
    }

    return (
        <Modal>
            <div className="flex flex-col gap-3 p-1 w-[50vw] font-urbanist">
                <div className='relative px-3 w-full flex justify-center items-center text-center'>
                    <h3 className='uppercase font-semibold tracking-wider text-2xl md:text-3xl'>Update Log</h3>
                    <button
                        type='button'
                        onClick={handleHideModalUpdate}
                        className='absolute -top-2 -right-3 md:right-0 w-10 h-10 rounded-lg'>
                        <IoCloseOutline className='w-full h-full' />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className='w-full my-8 px-4 flex flex-col justify-center gap-5'>
                    <div className="mt-3 mb-3 w-full relative z-0 group">
                        <input 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            type="text" 
                            name="description" 
                            id="description" 
                            className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent 
                                            border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 
                                            focus:border-blue-600 peer" 
                            placeholder=" " 
                            required 
                        />
                        <label 
                            htmlFor="description" 
                            className="absolute top-3 -z-10 text-sm text-gray-500 dark:text-gray-400 
                                            duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:font-medium 
                                            peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                            peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Description</label>
                    </div>
                    <div className="mb-3 mt-4 w-full relative z-0 group">
                            <select 
                                required 
                                value={type} 
                                onChange={(e) => setType(e.target.value)} 
                                id="type" 
                                className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent 
                                            border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 
                                            focus:border-blue-600 peer"
                            >
                                <option value="">Choose a status</option>
                                {statusOptions.map((option) => (
                                    <option key={option.value} value={option.value} >{option.label}</option>
                                ))}
                            </select>
                            <label 
                                htmlFor="type" 
                                className="absolute top-3 -z-10 text-sm text-gray-500 duration-300 
                                            transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:font-medium 
                                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Status</label>
                    </div>
                    <div className="mt-3 mb-3 w-full relative z-0 group">
                        <input 
                            value={nominal} 
                            onChange={(e) => setNominal(e.target.value)} 
                            type="number" 
                            name="nominal" 
                            id="nominal" 
                            className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent 
                                            border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 
                                            focus:border-blue-600 peer" 
                            placeholder=" " 
                            required 
                        />
                        <label 
                            htmlFor="nominal" 
                            className="absolute top-3 -z-10 text-sm text-gray-500 dark:text-gray-400 
                                            duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:font-medium 
                                            peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                            peer-focus:scale-75 peer-focus:-translate-y-6"
                        >Nominal</label>
                    </div>
                    <button
                        type='submit'
                        className='mt-5 flex justify-center items-center self-end bg-green-500 hover:bg-green-700 px-5 py-2 w-fit text-white rounded-md'
                    >
                        Update Log
                    </button>
                </form>
            </div>
        </Modal>
    )
}

export default UpdateModal