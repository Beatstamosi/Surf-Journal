// Convert rating enum to number for display
export const getRatingNumber = (rating: string): number => {
  switch (rating) {
    case "ONE":
      return 1;
    case "TWO":
      return 2;
    case "THREE":
      return 3;
    case "FOUR":
      return 4;
    case "FIVE":
      return 5;
    default:
      return 0;
  }
};

// Convert number to rating enum
export const handleRatingClick = (
  starNumber: number,
  setSessionRating: (rating: "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE") => void
) => {
  switch (starNumber) {
    case 1:
      setSessionRating("ONE");
      break;
    case 2:
      setSessionRating("TWO");
      break;
    case 3:
      setSessionRating("THREE");
      break;
    case 4:
      setSessionRating("FOUR");
      break;
    case 5:
      setSessionRating("FIVE");
      break;
    default:
      setSessionRating("ZERO");
  }
};