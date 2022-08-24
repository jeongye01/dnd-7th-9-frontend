import React, { useState } from 'react';
import { Router, useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import Box from '@app.component/box';
import ProgressHeader from '@app.component/header/Progress';
import BackAlertModal from '@app.component/modal/BackAlertModal';
import PageController from '@app.component/pageController/PageController';
import AnswerCheckButton from '@app.feature/quiz/component/button/AnswerCheckButton';
import { IQuestionBook, IQuestionBookQuizEnd } from '@app.feature/solve-quiz/types';
import { fetchPostQuestionBookEnd } from '@app.feature/solve-quiz/api';

function GoalDetail() {
	return (
		<div className="flex flex-col">
			<span className="text-slate text-small2 font-bold">1주차 목표</span>
			<span className="mt-[4px] text-slate text-small1 font-regular">기본 동사 20개 암기하기</span>
		</div>
	);
}

interface Props {
	quizId: number;
	questionBookId: string | string[];
	questionBookData: IQuestionBook[];
}

// 임시로 5문제를 가진 문제집의 1페이지로 설정
export default function CreateQuizScreen({ quizId, questionBookId, questionBookData }: Props) {
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [solveQuiz, setSolveQuiz] = useState({
		questionBookId: Number(questionBookId),
		solveDtoList: [
			...questionBookData.map((question) => {
				return { questionId: question.questionId, checkAnswer: -1 };
			}),
		],
	});

	const mutation = useMutation((solvedQuizzes: IQuestionBookQuizEnd) => {
		return fetchPostQuestionBookEnd(solvedQuizzes);
	});

	const toPrevHandler = () => {
		if (quizId <= 1) return;
		router.push({ pathname: `/solve-quiz/${quizId - 1}`, query: { questionBookId } });
	};

	const toNextHandler = () => {
		if (quizId > questionBookData.length) return;
		router.push({ pathname: `/solve-quiz/${quizId + 1}`, query: { questionBookId } });
	};

	// console.log('questionBookData :: ', questionBookData);
	// console.log('solveQuiz :: ', solveQuiz);

	return (
		<div>
			<ProgressHeader
				curPage={quizId}
				pagesLength={questionBookData.length}
				Description={<GoalDetail />}
				backAlertModalOpen={() => setIsModalOpen(true)}
			/>
			<div className="mt-[80px] mb-[120.07px]">
				{/* 질문 */}
				<span className="block mb-[40px] text-headline text-black-400 font-medium">
					{questionBookData[quizId - 1].questionContent}
				</span>

				{/* 퀴즈 */}
				{questionBookData[quizId - 1].optionList.map((option, optionIndex) => (
					<Box key={option.optionId} height="h-[64px]" className="mt-[12px]">
						<div
							className={`w-full flex items-center rounded justify-between px-[22.09px]
							${solveQuiz.solveDtoList[quizId - 1].checkAnswer - 1 === optionIndex && 'bg-green-200 border-[1px] border-[#1CB576]'}`}
						>
							<span className=" text-body1 font-medium ">{option.optionContent}</span>

							<AnswerCheckButton
								ringColor="ring-[#1AB576]"
								isChecked={solveQuiz.solveDtoList[quizId - 1].checkAnswer - 1 === optionIndex}
								checkHandler={() => {
									setSolveQuiz({
										questionBookId: Number(questionBookId),
										solveDtoList: solveQuiz.solveDtoList.map((answer, answerIndex) =>
											answerIndex === quizId - 1 ? { ...answer, checkAnswer: optionIndex + 1 } : answer
										),
									});
								}}
							/>
						</div>
					</Box>
				))}
				<BackAlertModal isModalOpen={isModalOpen} onCloseModal={() => setIsModalOpen(false)} />
			</div>
			<PageController
				curPage={quizId}
				pagesLength={questionBookData.length}
				finishWord="제출하기"
				toPrevHandler={toPrevHandler}
				toNextHandler={toNextHandler}
				finishHandler={() => {
					mutation.mutate(solveQuiz);

					if (mutation.isSuccess) console.log('mutation Data :: ', mutation.data);
				}}
			/>
		</div>
	);
}
