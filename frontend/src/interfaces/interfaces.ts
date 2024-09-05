export interface user {
  username: string;
  email: string;
}
interface home {
  streetAddress: string;
  state: string;
  zip: string;
  sqft: number;
  beds: number;
  baths: number;
  listPrice: number;
}

export interface HomeData {
  username: string;
  email: string;
  homes: home[];
  totalPages: number;
}

export interface RelatedUser {
  street_address: string;
  data: user[];
}

export interface EditModalProps {
  isOpen: boolean;
  selectedHome: string;
  relatedUsers?: { username: string }[];
  initialCheckedUsernames: { [username: string]: boolean };
  isLoading: boolean;
  isUpdating: boolean;
  errorMessage: string;
  onCheckboxChange: (username: string) => void;
  onUpdate: () => void;
  onClose: () => void;
}

export interface HomeCardProps {
  home: {
    streetAddress: string;
    listPrice: number;
    state: string;
    zip: string;
    sqft: number;
    beds: number;
    baths: number;
  };
  onEditClick: (streetAddress: string) => void;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (direction: "prev" | "next") => void;
}

export interface UserSelectProps {
  selectedUser: string;
  users: { username: string }[];
  onUserChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
