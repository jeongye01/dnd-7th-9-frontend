import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Input from '@app.component/input';
import DefaultButton from '@app.component/button/DefaultButton';
import ItemInvitedMember from '../item/ItemInvitedMember';

export default function DrawerInviteTeamMember() {
	const router = useRouter();

	const [isInviteDrawerOpen, setIsInviteDrawerOpen] = useState(false);
	const [inputMember, setInputMember] = useState('');
	const [invitedTeamMember, setInvitedTeamMember] = useState<string[]>([]);

	const onChangeInputMember = (value: string) => {
		setInputMember(value);
	};

	const handleInviteMember = () => {
		if (inputMember.trim() === '' || invitedTeamMember.includes(inputMember)) return; // TO DO : 이미 목록에 있거나 유효하지 않은 유저에 대한 처리
		setInvitedTeamMember((prev) => [...prev, inputMember]);
		setInputMember('');
	};

	const handleOnDelete = (deleteIndex: number) => {
		setInvitedTeamMember(invitedTeamMember.filter((_, index) => index !== deleteIndex));
	};

	return (
		<div className="absolute bottom-0 left-0 right-0 bg-background-white px-[10px] pt-[39px] pb-[33px] rounded-t-[20px]">
			<p className="text-black-500 text-body2 font-medium mb-[20px]">이메일을 작성해 팀원들을 초대해주세요.</p>
			<div className="flex justify-center mb-[35px]">
				<Input
					className="rounded-l w-full"
					placeholder="팀원의 이메일 작성"
					value={inputMember}
					onClick={() => setIsInviteDrawerOpen(true)}
					onChange={(event) => onChangeInputMember(event.target.value)}
				/>
				<button
					type="button"
					className="bg-slate text-background-white text-body2 font-bold rounded-r whitespace-nowrap w-[30%] px-[21px] py-[19px]"
					onClick={handleInviteMember}
				>
					추가
				</button>
			</div>
			{isInviteDrawerOpen && (
				<div className="overflow-auto h-[350px] mb-[10px] px-[-10px]">
					{invitedTeamMember.map((member, index) => (
						<ItemInvitedMember key={member} member={member} onDelete={() => handleOnDelete(index)} />
					))}
				</div>
			)}

			{/* TO DO : 스터디 그룹 생성 & 사용자 초대 API 연동 */}
			<DefaultButton text="초대하기" onClick={() => router.push('/complete/invite-member')} />
		</div>
	);
}
