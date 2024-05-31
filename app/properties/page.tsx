import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import React from 'react'
import TripsClient from "./PropertiesClient";
import getListings from "../actions/getListing";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) return (
        <ClientOnly>
            <EmptyState 
            title="Unauthorized"
            subtitle="Please login"
            />
        </ClientOnly>
    )

    const listings = await getListings({
        userId: currentUser.id
    })

    if(listings.length === 0) return (
        <ClientOnly>
            <EmptyState 
            title="No properties found"
            subtitle="Looks like you havent properties"
            />
        </ClientOnly>
    )
    return (
        <ClientOnly>
            <TripsClient 
            listings={listings}
            currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage
