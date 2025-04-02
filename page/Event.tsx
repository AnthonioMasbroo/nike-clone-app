import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import '../global.css';
import { EventsCard } from '../component/EventsCard';
import { ExperiencesModalEvents } from '../component/ExperiencesModalEvents';

const Event = () => {
    return (
        <>
            <ScrollView className='bg-white'>
                <View className='px-6 mt-10'>
                    <ExperiencesModalEvents />
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="px-6 gap-10 pt-10"
                >
                    <TouchableOpacity className='pr-10'>
                        <Text className='text-black text-lg font-montserrat-bold'>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='pr-10'>
                        <Text className='text-neutral-600 text-lg font-montserrat-medium'>Arts & Culture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='pr-10'>
                        <Text className='text-neutral-600 text-lg font-montserrat-medium'>Basketball</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='pr-10'>
                        <Text className='text-neutral-600 text-lg font-montserrat-medium'>Customisation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='pr-10'>
                        <Text className='text-neutral-600 text-lg font-montserrat-medium'>Dance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='pr-10'>
                        <Text className='text-neutral-600 text-lg font-montserrat-medium'>Fashion and style</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='pr-10'>
                        <Text className='text-neutral-600 text-lg font-montserrat-medium'>Recovery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='pr-10'>
                        <Text className='text-neutral-600 text-lg font-montserrat-medium'>Running</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='pr-10'>
                        <Text className='text-neutral-600 text-lg font-montserrat-medium'>Skateboarding</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='pr-10'>
                        <Text className='text-neutral-600 text-lg font-montserrat-medium'>Sustainability</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='pr-10'>
                        <Text className='text-neutral-600 text-lg font-montserrat-medium'>Training</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='pr-10'>
                        <Text className='text-neutral-600 text-lg font-montserrat-medium'>Yoga</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='pr-10'>
                        <Text className='text-neutral-600 text-lg font-montserrat-medium'>Other</Text>
                    </TouchableOpacity>
                </ScrollView>

                <EventsCard event={[
                    {
                        image: require('../assets/event/e1.png'),
                        title: "Nike By You Womens \nHistory Month",
                        date: "Mon, Mar 1 - Mon, Mar 31",
                        place: "650 5th Ave"
                    },
                    {
                        image: require('../assets/event/e2.png'),
                        title: "Nike By You Womens \nHistory Month",
                        date: "Tue, Apr 1 - Tue, Apr 31",
                        place: "London"
                    }
                ]} />
                <EventsCard event={[
                    {
                        image: require('../assets/event/e3.png'),
                        title: "Nike By You Womens \nHistory Month",
                        date: "Mon, May 1 - Mon, May 31",
                        place: "Boston"
                    },
                    {
                        image: require('../assets/event/e4.png'),
                        title: "Nike By You Womens \nHistory Month",
                        date: "Mon, Jun 1 - Mon, Jun 31",
                        place: "650 5th Ave"
                    }
                ]} />
                <EventsCard event={[
                    {
                        image: require('../assets/event/e5.png'),
                        title: "Nike By You Womens \nHistory Month",
                        date: "Mon, Jul 1 - Mon, Jul 31",
                        place: "Los Angeles"
                    },
                    {
                        image: require('../assets/event/e6.png'),
                        title: "Nike By You Womens \nHistory Month",
                        date: "Mon, Aug 1 - Mon, Aug 31",
                        place: "Nike NYC"
                    }
                ]} />
            </ScrollView>
        </>
    )
}

export default Event;