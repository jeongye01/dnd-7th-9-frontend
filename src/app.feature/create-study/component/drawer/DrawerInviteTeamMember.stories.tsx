import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import DrawerInviteTeamMember from './DrawerInviteTeamMember';

export default {
	title: 'app.feature/create-study/component/DrawerInviteTeamMember',
	component: DrawerInviteTeamMember,
} as ComponentMeta<typeof DrawerInviteTeamMember>;

const Template: ComponentStory<typeof DrawerInviteTeamMember> = () => <DrawerInviteTeamMember />;

export const Default = Template.bind({});
