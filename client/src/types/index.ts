export interface MenuItem {
  card: {
    card: {
      info?: RestaurantInfo
      // Add more fields as required
    }
  }
  groupedCard?: {
    cardGroupMap?: {
      REGULAR?: {
        cards?: MenuItem[]
      }
    }
  }
}

interface RestaurantInfo {
  name?: string
  cuisine?: string[]
  location?: string
  // Add more fields based on your API response
}

//Home props
interface SLA {
  deliveryTime: number
  lastMileTravel: number
  serviceability: string
  slaString: string
  lastMileTravelString: string
  iconType: string
}

interface Availability {
  nextCloseTime: string
  opened: boolean
}

interface Badges {
  imageBadges: Array<Record<string, unknown>>
}

interface BadgesV2 {
  entityBadges: {
    imageBased?: Record<string, unknown>
    textBased?: Record<string, unknown>
    textExtendedBadges?: Record<string, unknown>
  }
}

interface AggregatedDiscountInfoV3 {
  header: string
  subHeader: string
}

interface DifferentiatedUi {
  displayType: string
  differentiatedUiMediaDetails: {
    lottie?: Record<string, unknown>
    video?: Record<string, unknown>
  }
}

interface ExternalRatings {
  aggregatedRating: {
    rating: string
  }
}

export interface RestaurantProps {
  id: string
  name: string
  cloudinaryImageId: string
  locality: string
  areaName: string
  costForTwo: string
  cuisines: string[]
  avgRating: number
  parentId: string
  avgRatingString: string
  totalRatingsString: string
  sla: SLA
  availability: Availability
  badges: Badges
  isOpen: boolean
  type: string
  badgesV2: BadgesV2
  aggregatedDiscountInfoV3: AggregatedDiscountInfoV3
  differentiatedUi: DifferentiatedUi
  reviewsSummary: Record<string, unknown>
  displayType: string
  restaurantOfferPresentationInfo: Record<string, unknown>
  externalRatings: ExternalRatings
  ratingsDisplayPreference: string
}
