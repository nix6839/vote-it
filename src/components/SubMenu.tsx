import { getMe } from '@/api/get-me.ts';
import useModal from '@/hooks/use-modal.ts';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import GetStartedDialog from './GetStartedDialog.tsx';

function SubMenuLoading() {
	return <div>Loading...</div>;
}

function SubMenuNotLoggedIn() {
	const queryClient = useQueryClient();

	const { isOpened, open, close } = useModal();

	async function handleDidLogin() {
		await queryClient.refetchQueries();
		close();
	}

	return (
		<>
			<button type="button" onClick={open}>
				시작하기
			</button>
			<GetStartedDialog
				isOpened={isOpened}
				onClose={close}
				didLogin={handleDidLogin}
			/>
		</>
	);
}

function SubMenuMain() {
	const { data: me } = useSuspenseQuery(getMe);

	if (!me.isLoggedIn) {
		return <SubMenuNotLoggedIn />;
	}

	return <p>{me.nickname}</p>;
}

export default function SubMenu() {
	return (
		<Suspense fallback={<SubMenuLoading />}>
			<SubMenuMain />
		</Suspense>
	);
}
