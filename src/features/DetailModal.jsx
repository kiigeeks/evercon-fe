import Modal from '../components/Modal'
import { IoCloseOutline } from "react-icons/io5";
import { BsTriangleFill } from "react-icons/bs";
import {formatRupiah} from '../helpers/formatRupiah'

const DetailModal = ({ handleHideModalDetail, activities }) => {
    return (
        <Modal>
            <div className="flex flex-col gap-3 p-1 w-[90vw] font-urbanist">
                <div className='relative px-3 w-full flex justify-center items-center text-center'>
                    <h3 className='uppercase font-semibold tracking-wider text-2xl md:text-3xl'>Detail Log</h3>
                    <button
                        type='button'
                        onClick={handleHideModalDetail}
                        className='absolute -top-2 -right-3 md:right-0 w-10 h-10 rounded-lg'>
                        <IoCloseOutline className='w-full h-full' />
                    </button>
                </div>
                <hr className='my-3 h-[2px] bg-gray-500 w-1/2 self-center'/>
                <div className='w-full my-8 px-4 flex flex-col justify-start gap-7 h-[70vh] overflow-scroll'>
                            
                    {activities.map((activity, index) => {
                        return (
                            <div key={index} className='w-full bg-gray-100 rounded-lg flex flex-col shadow-xl px-7 py-5'>
                                <div className='flex justify-between'>
                                    <div className='flex flex-col gap-3'>
                                        <h5 className='text-gray-800 tracking-widest uppercase text-lg'>
                                            {activity.type === 'revenue' ? 'pemasukkan' : 'pengeluaran'}
                                        </h5>
                                        <h3 className='font-semibold text-3xl'>
                                            {formatRupiah(activity.value)}
                                        </h3>
                                        <p className='text-gray-800 text-sm font-light tracking-wider'>
                                            {activity.description}
                                        </p>
                                    </div>
                                    <BsTriangleFill className={`${activity.type === 'expense' ? 'text-red-500 rotate-180' : 'text-green-500'} text-5xl self-center mr-5`}/>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </Modal>
    )
}

export default DetailModal