import React from 'react';
import '../styles.css';

interface Listing {
  name: string;
  color: string;
  contact: string;
  price: number;
  date: string;
  city: string;
}

interface CardProps {
  listing: Listing;
}

const Card: React.FC<CardProps> = ({ listing }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{listing.name}</h2>
        <span>{listing.date}</span>
      </div>
      <div className="card-content">
        <p>Culoare: {listing.color}</p>
        <p>Contact: {listing.contact}</p>
        <p>Pret/ora: {listing.price} Lei</p>
        <p>Oras: {listing.city}</p>
      </div>
    </div>
  );
};

export default Card;
