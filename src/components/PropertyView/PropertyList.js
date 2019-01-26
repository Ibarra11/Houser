import Property from './Property';
import React from 'react';
const PropertyList = function ({ propertyList, deleteProperty, editProperty }) {
    return (
        <div>
            {propertyList.map(property => {
                    return <Property editProperty={editProperty}  deleteProperty={deleteProperty} key={property.property_id} property={property} />
                
            })}
        </div>
    )
}

export default PropertyList;

