import React from 'react';
import Input from '@app.component/input';
import { useCreateDetailGoalStore } from '@app.modules/store/create-detail-goal/createDetailGoal';
import LayoutCreateDetailGoalByInput from '../component/layout/LayoutCreateDetailGoalByInput';

/* id2 = 세부 목표 */
export default function CreateDetailGoalScreenByContent() {
	const { updateDetailGoalContent } = useCreateDetailGoalStore();

	return (
		<div>
			<LayoutCreateDetailGoalByInput
				title="세부 목표를 작성해주세요."
				content={
					<div>
						<span className="block mt-[12px] text-slate text-small2 font-bold">세부 목표</span>
						<Input
							className="rounded w-full mt-[8px] h-[88px]"
							placeholder="세부 목표 내용"
							required
							onChange={(event) => updateDetailGoalContent({ goalContent: event.target.value })}
						/>
					</div>
				}
			/>
		</div>
	);
}
