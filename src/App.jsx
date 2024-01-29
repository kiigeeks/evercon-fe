import { useEffect, useState } from 'react'
import './App.css'
import { BsTriangleFill } from "react-icons/bs";
import UpdateModal from './features/UpdateModal';
import DetailModal from './features/DetailModal';
import axios from 'axios';
import {formatRupiah} from './helpers/formatRupiah'

import { ToastContainer, toast } from 'react-toastify';


function App() {
	const [isModalUpdate, setIsModalUpdate] = useState(false)
	const [isModalDetail, setIsModalDetail] = useState(false)
	const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isModalUpdate]);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/v1/users/${import.meta.env.VITE_API_USER_ID}`);
			setData(response.data);
		} catch (error) {
            toast.error("Something Wrong : " + error, {
                autoClose: 3000
            });
		} finally {
			setIsLoading(false);
		}
	}

	const handleOpenModalUpdate = () => {
		setIsModalUpdate(true)
	}

	const handleHideModalUpdate = () => {
		setIsModalUpdate(false)
	}

	const handleOpenModalDetail = () => {
		setIsModalDetail(true)
	}

	const handleHideModalDetail = () => {
		setIsModalDetail(false)
	}
	return (
		<>
		<ToastContainer />
			{isModalUpdate ? <UpdateModal handleHideModalUpdate={handleHideModalUpdate} /> : null }
			{isModalDetail ? <DetailModal handleHideModalDetail={handleHideModalDetail} activities={data.Activities} /> : null }
			<div className="flex flex-col h-screen justify-between">
				<header className="w-full pt-24 flex flex-col gap-7 justify-center items-center  text-gray-800 relative">
					<h3 className="text-6xl text-center font-semibold uppercase tracking-widest">
						Saldo Terkini
					</h3>
				</header>
				<main className="mt-28 mb-auto w-full flex flex-col justify-center items-center">
					<section className="flex flex-col justify-center items-center gap-5 mb-5">    
						<div className="flex flex-col w-full items-center p-3">
							{isLoading ? "loading" : (
								<h2 className="counter font-bold text-9xl tracking-widest">{formatRupiah(data.Currency?.balance)}</h2>
							)}
						</div>
					</section>
				</main>
				<footer className='my-0 w-full px-7 py-6 flex justify-between items-center'>
					<div className='flex flex-row gap-5'>
						<div onClick={handleOpenModalUpdate} className="px-6 py-2 w-fit flex justify-center items-center bg-gradient-to-b from-green-600 to-green-400 text-white text-lg uppercase tracking-widest rounded-xl cursor-pointer">
							Update
						</div>
						<div onClick={handleOpenModalDetail} className="px-6 py-2 w-fit flex justify-center items-center bg-gradient-to-b from-[#f59d17] to-[#fbc509] text-white text-lg uppercase tracking-widest rounded-xl cursor-pointer">
							Detail
						</div>
					</div>
					<h1 className="text-gray-800 text-lg font-medium font-urbanist tracking-wider">
						Copyright © CIA
					</h1>
					{isLoading ? "loading" : (
						<div className='bg-white px-5 py-2 rounded-md drop-shadow-xl flex items-center gap-5 justify-between cursor-pointer'>
							{data.Activities?.length ? 
								(
									<>
										<span>{formatRupiah(data.Activities[0].value)}</span>
										<BsTriangleFill className={`${data.Activities[0].type === 'expense' ? 'text-red-500 rotate-180' : 'text-green-500'}`}/>
									</>
								) : "-"}
							
						</div>
					)}
				</footer>
			</div>
		</>
	)
}

export default App
