import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import "../global.css"
import { InboxCard } from '../component/InboxCard';


const Inbox = ({navigation}) => {
    return (
        <>
            <ScrollView className='bg-white'>
                <InboxCard
                    image={require('../assets/inbox/i1.png')}
                    title="Sneakers of the Week"
                    desc="The Air Zoom Spiridon Cage 2 blends Y2K design with next-gen tech in Varsity Blue. Shop the drop today."
                    time="1 week ago"
                    onViewInbox={() => navigation.navigate('InboxDetail')}
                />
                <InboxCard
                    image={require('../assets/inbox/i2.png')}
                    title="Sneakers of the Week"
                    desc="The Air Max Plus OG delivers head-turning gradient glory in 'Black/Chamois Sky Blue'. Cop the drop and more."
                    time="1 week ago"
                    onViewInbox={() => navigation.navigate('InboxDetail')}
                />
                <InboxCard
                    image={require('../assets/inbox/i3.png')}
                    title="Max Cushioning Is Here"
                    desc="The all-new Vomero 18: double-stacked cushioning for the ultimade ride."
                    time="1 week ago"
                    onViewInbox={() => navigation.navigate('InboxDetail')}
                />
            </ScrollView>
        </>
    )
}

export default Inbox;