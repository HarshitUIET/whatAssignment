import React, { useState, useEffect } from 'react';
import '../app/globals.css';
import Image from 'next/image';
import HollowCircleChart from './HollowChart';
import PercentileLineChart from './PercentileChart';
import { toast, ToastContainer } from 'react-toastify';

const Skill = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [rank, setRank] = useState('');
    const [percentile, setPercentile] = useState('');
    const [score, setScore] = useState('');

    const [finalRank, setFinalRank] = useState('11');
    const [finalPercentile, setFinalPercentile] = useState('92');
    const [finalScore, setFinalScore] = useState('8');

    // Load data from localStorage only on client-side
    useEffect(() => {
        const storedRank = localStorage.getItem('rank') || '';
        const storedPercentile = localStorage.getItem('percentile') || '';
        const storedScore = localStorage.getItem('score') || '';
        const storedFinalRank = localStorage.getItem('finalRank') || '11';
        const storedFinalPercentile = localStorage.getItem('finalPercentile') || '92';
        const storedFinalScore = localStorage.getItem('finalScore') || '8';

        setRank(storedRank);
        setPercentile(storedPercentile);
        setScore(storedScore);
        setFinalRank(storedFinalRank);
        setFinalPercentile(storedFinalPercentile);
        setFinalScore(storedFinalScore);
    }, []);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const [rankError, setRankError] = useState(false);
    const [percentileError, setPercentileError] = useState(false);
    const [scoreError, setScoreError] = useState(false);

    const RankChangeHandler = (value) => {
        setRank(value);
        setRankError(value === '');
    };

    const PercentileChangeHanlder = (value) => {
        setPercentile(value);
        setPercentileError(value === '');
    };

    const ScoreChangeHandler = (value) => {
        setScore(value);
        setScoreError(value === '');
    };

    const validateForm = (e) => {
        e.preventDefault();
        let hasError = false;

        if (rank === '' || percentile === '' || score === '') {
            if (rank === '') {
                setRankError(true);
                hasError = true;
            }
            if (percentile === '') {
                setPercentileError(true);
                hasError = true;
            }
            if (score === '') {
                setScoreError(true);
                hasError = true;
            }
            if (hasError) {
                toast.error('Please fill all the fields');
                return;
            }
        }

        if (isNaN(rank) || isNaN(percentile) || isNaN(score)) {
            if (isNaN(rank)) {
                setRankError(true);
            }
            if (isNaN(percentile)) {
                setPercentileError(true);
            }
            if (isNaN(score)) {
                setScoreError(true);
            }
            toast.error('All fields must be numeric values');
            return;
        }

        if (percentile < 1 || percentile > 100) {
            setPercentileError(true);
            toast.error('Percentile must be between 1 and 100');
            return;
        }

        if (score < 0 || score > 15) {
            setScoreError(true);
            toast.error('Score must be between 0 and 15');
            return;
        }

        setFinalRank(rank);
        setFinalPercentile(percentile);
        setFinalScore(score);

        localStorage.setItem('finalRank', rank);
        localStorage.setItem('finalPercentile', percentile);
        localStorage.setItem('finalScore', score);

        setRank('');
        setPercentile('');
        setScore('');

        localStorage.removeItem('rank');
        localStorage.removeItem('percentile');
        localStorage.removeItem('score');

        toast.success('Score Updated successfully');
        closeDialog();
    };

    return (
        <div className="flex flex-col px-4 py-4 text-black space-y-4 w-full">
            <div>Skill Test</div>
            <div className="flex flex-col space-y-4 lg:flex-row w-full">
                <div className="w-full lg:w-1/2 flex flex-col space-y-4">
                    <div className='border rounded-md py-4 px-4'>
                        <div className='flex space-x-3 justify-between items-center'>
                            <div>
                                <Image src='/html.png' alt="html" width={50} height={50} />
                            </div>
                            <div className='flex flex-col'>
                                <div className='font-bold'>Hyper Text Markup Language</div>
                                <div>Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021</div>
                            </div>
                            <div>
                                <button
                                    className='bg-blue-900 text-white px-4 py-2 rounded-md'
                                    onClick={openDialog}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col rounded-md space-y-2 border py-4 px-2'>
                            <div className='font-bold'>Quick Statistics</div>
                            <div className='flex justify-between space-x-3'>
                                <div className='flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-between lg:flex-col lg:space-y-2 xl:space-y-0 xl:flex-row xl:justify-between px-2 space-x-2 md:space-x-6'>
                                    <div className='flex space-x-4 px-2 lg:px-6 xl:px-0'>
                                        <div className="rounded-full bg-gray-100 border flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12">
                                            <Image className="p-1 sm:p-2" src="/trophyfinal.png" alt="Trophy" layout="intrinsic" width={40} height={40} />
                                        </div>
                                        <div className='flex flex-col mt-1'>
                                            <div className='font-bold'>{finalRank}</div>
                                            <div className='flex text-gray-500'>YOUR RANK</div>
                                        </div>
                                    </div>
                                    <div className='h-full hidden md:block w-[1px] border'></div>
                                    <div className='flex space-x-4'>
                                        <div className='rounded-full bg-gray-100 border flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12'>
                                            <Image className='p-1 sm:p-2' layout="intrinsic" src='/paperboard.png' width={40} height={40} />
                                        </div>
                                        <div className='flex flex-col mt-1'>
                                            <div className='font-bold'>{finalPercentile}%</div>
                                            <div className='text-gray-500'>PERCENTILE</div>
                                        </div>
                                    </div>
                                    <div className='h-full hidden md:block w-[1px] border'></div>
                                    <div className='flex space-x-4'>
                                        <div className='rounded-full bg-gray-100 border flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12'>
                                            <Image layout="intrinsic" className='p-1 sm:p-2' src='/greentick.png' width={40} height={40} />
                                        </div>
                                        <div className='flex flex-col mt-1'>
                                            <div className='font-bold'>{finalScore}/15</div>
                                            <div className='text-gray-500'>CORRECT ANSWERS</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex border flex-col space-y-4 px-2 py-4'>
                        <div className='font-bold'>Comparison Graph</div>
                        <div className='flex justify-between px-2'>
                            <div className='flex flex-col'>
                                <div>
                                    <span className='font-bold'>You Scored {finalPercentile} Percentile</span> which is lower than the
                                </div>
                                <div>
                                    <span>average percentile 72% of all the engineers who took this assessment</span>
                                </div>
                            </div>
                            <div>
                                <div className='rounded-full left-2 bg-gray-100 border'>
                                    <Image className='py-2 px-2' src='/comparison.png' width={40} height={40} />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <PercentileLineChart percentile={finalPercentile} />
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 lg:ml-4">
                    <div className='flex flex-col space-y-4'>
                        <div className='flex px-4 py-4 border rounded-md flex-col space-y-8'>
                            <div className='font-bold'>Syllabus Wise Analysis</div>
                            <div className='flex flex-col space-y-2'>
                                <span>HTML Tools, Forms, History</span>
                                <div className='flex justify-start space-x-3'>
                                    <div className="relative w-3/4 h-4 bg-gray-200 rounded-md">
                                        <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-md" style={{ width: '80%' }}></div>
                                    </div>
                                    <div className='text-md mb-2 text-blue-500'>80 %</div>
                                </div>
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <span>HTML Tools, Forms, History</span>
                                <div className='flex justify-start space-x-3'>
                                    <div className="relative w-3/4 h-4 bg-gray-200 rounded-md">
                                        <div className="absolute top-0 left-0 h-full bg-orange-500 rounded-md" style={{ width: '60%' }}></div>
                                    </div>
                                    <div className='text-md mb-2 text-orange-500'>60 %</div>
                                </div>
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <span>Tags & References in HTML</span>
                                <div className='flex justify-start space-x-3'>
                                    <div className="relative w-3/4 h-4 bg-gray-200 rounded-md">
                                        <div className="absolute top-0 left-0 h-full bg-red-500 rounded-md" style={{ width: '24%' }}></div>
                                    </div>
                                    <div className='text-md mb-2 text-red-500'>24 %</div>
                                </div>
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <span>Tables & CSS Basics</span>
                                <div className='flex justify-start space-x-3'>
                                    <div className="relative w-3/4 h-4 bg-gray-200 rounded-md">
                                        <div className="absolute top-0 left-0 h-full bg-green-500 rounded-md" style={{ width: '96%' }}></div>
                                    </div>
                                    <div className='text-md mb-2 text-green-500'>96 %</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col border rounded-md px-4 py-4 space-y-2'>
                            <div className='flex justify-between'>
                                <div className='font-bold'>Question Analysis</div>
                                <div className='font-bold text-blue-800'>{finalScore}/15</div>
                            </div>
                            <div>
                                <span className='font-bold text-gray-500'>You Scored {finalScore} questions correct out of 15.</span>
                                <span className='text-gray-600'>However, it still needs some improvements.</span>
                            </div>
                            <div className='flex items-center justify-center'>
                                <HollowCircleChart score={finalScore} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-[80%] md:w-[45%]">
                        <form onSubmit={validateForm}>
                            <div className='flex justify-between'>
                                <h3 className="text-lg font-bold mb-4">Update Scores</h3>
                                <Image src='/html.png' alt="html" width={50} height={50} />
                            </div>
                            <div className='flex flex-col space-y-4 md:space-y-2 my-4'>
                                <div className='flex flex-col space-y-2 md:flex-row md:justify-between space-x-2'>
                                    <div className='flex space-x-4'>
                                        <div className='rounded-full bg-blue-900 px-3 text-white py-1 h-[30px]'>
                                            1
                                        </div>
                                        <div className='text-lg'>
                                            Update Your <span className='font-bold'>Rank</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex flex-col space-y-4 md:space-y-1'>
                                            <input type="text"
                                                value={rank} onChange={(e) => RankChangeHandler(e.target.value)} required className='border rounded-md px-2 py-1' />
                                            {rankError && <span className='text-red-500'>Rank is required</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col space-y-2 md:flex-row md:justify-between space-x-2'>
                                    <div className='flex space-x-4'>
                                        <div className='rounded-full bg-blue-900 px-3 h-[30px] text-white py-1'>
                                            2
                                        </div>
                                        <div className='text-lg'>
                                            Update Your <span className='font-bold'>Percentile</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex flex-col space-y-1'>
                                            <input type="text" required
                                                value={percentile} onChange={(e) => PercentileChangeHanlder(e.target.value)} className='border rounded-md px-2 py-1' />
                                            {percentileError && <span className='text-red-500'>Percentile is required</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col space-y-2 md:flex-row md:justify-between space-x-2'>
                                    <div className='flex space-x-4'>
                                        <div className='rounded-full bg-blue-900 h-[30px] px-3 text-white py-1'>
                                            3
                                        </div>
                                        <div className='text-lg'>
                                            Update Your <span className='font-bold'>Current Score (out of 15)</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex flex-col space-y-1'>
                                            <input type="text" required
                                                value={score}
                                                onChange={(e) => ScoreChangeHandler(e.target.value)} className='border rounded-md px-2 py-1' />
                                            {scoreError && <span className='text-red-500'>Score is required</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    className="bg-gray-300 text-black px-4 py-2 rounded-md"
                                    onClick={closeDialog}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    type='submit'
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default Skill;
