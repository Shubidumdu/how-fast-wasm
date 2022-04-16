type CardProps = {
  isFlipped: boolean,
}

const Card = ({ isFlipped }: CardProps) => {
  if (isFlipped) {
    return (
      <div>Back</div>
    );
  }

  return (
    <div>Front</div>
  );
};

export default Card;
