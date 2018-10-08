import Property from './Property';
import React from 'react';
const PropertyList = function ({ propertyList, deleteProperty }) {
    return (
        <div>
            {propertyList.map(property => {
                return <Property deleteProperty={deleteProperty} key={property.property_id} property={property} />
            })}
        </div>
    )
}

export default PropertyList;

