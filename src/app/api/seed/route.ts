import { NextResponse } from "next/server";
import { initializeDataSource } from "../../../data-source";
import { Deal } from "../../../lib/entities/deals/Deal";

const sampleDeals = [
  // Historical deals (2024) for pattern analysis
  {
    deal_id: "RV-001",
    company_name: "Pacific Logistics Inc",
    contact_name: "Sarah Chen",
    transportation_mode: "ocean",
    stage: "closed_won",
    value: 45000,
    probability: 100,
    created_date: "2024-10-15T09:00:00Z",
    updated_date: "2024-11-28T14:30:00Z",
    expected_close_date: "2024-12-15T00:00:00Z",
    sales_rep: "Mike Rodriguez",
    origin_city: "Los Angeles, CA",
    destination_city: "Shanghai, China",
    cargo_type: "Electronics",
  },
  {
    deal_id: "RV-002",
    company_name: "Mountain Transport Co",
    contact_name: "David Park",
    transportation_mode: "trucking",
    stage: "closed_won",
    value: 12000,
    probability: 100,
    created_date: "2024-11-01T11:15:00Z",
    updated_date: "2024-12-03T16:45:00Z",
    expected_close_date: "2024-12-10T00:00:00Z",
    sales_rep: "Jennifer Walsh",
    origin_city: "Denver, CO",
    destination_city: "Phoenix, AZ",
    cargo_type: "Machinery",
  },
  {
    deal_id: "RV-003",
    company_name: "Global Freight Solutions",
    contact_name: "Maria Rodriguez",
    transportation_mode: "air",
    stage: "closed_won",
    value: 75000,
    probability: 100,
    created_date: "2024-11-20T08:30:00Z",
    updated_date: "2024-11-25T10:15:00Z",
    expected_close_date: "2024-11-30T00:00:00Z",
    sales_rep: "Tom Wilson",
    origin_city: "Miami, FL",
    destination_city: "London, UK",
    cargo_type: "Pharmaceuticals",
  },
  {
    deal_id: "RV-004",
    company_name: "Midwest Rail Corp",
    contact_name: "James Thompson",
    transportation_mode: "rail",
    stage: "closed_won",
    value: 28000,
    probability: 100,
    created_date: "2024-11-10T14:20:00Z",
    updated_date: "2024-11-30T09:45:00Z",
    expected_close_date: "2024-12-25T00:00:00Z",
    sales_rep: "Lisa Anderson",
    origin_city: "Chicago, IL",
    destination_city: "Houston, TX",
    cargo_type: "Automotive Parts",
  },
  {
    deal_id: "RV-005",
    company_name: "Coastal Shipping LLC",
    contact_name: "Robert Kim",
    transportation_mode: "ocean",
    stage: "closed_won",
    value: 95000,
    probability: 100,
    created_date: "2024-10-05T12:00:00Z",
    updated_date: "2024-11-15T16:30:00Z",
    expected_close_date: "2024-11-30T00:00:00Z",
    sales_rep: "Mike Rodriguez",
    origin_city: "Seattle, WA",
    destination_city: "Tokyo, Japan",
    cargo_type: "Consumer Goods",
  },
  {
    deal_id: "RV-006",
    company_name: "Express Trucking Inc",
    contact_name: "Amanda Foster",
    transportation_mode: "trucking",
    stage: "closed_lost",
    value: 18000,
    probability: 0,
    created_date: "2024-09-15T10:30:00Z",
    updated_date: "2024-11-20T14:00:00Z",
    expected_close_date: "2024-11-01T00:00:00Z",
    sales_rep: "Jennifer Walsh",
    origin_city: "Atlanta, GA",
    destination_city: "New York, NY",
    cargo_type: "Food Products",
  },

  // 2025 Q1 Deals - January
  {
    deal_id: "RV-101",
    company_name: "TechCargo Solutions",
    contact_name: "Alex Johnson",
    transportation_mode: "air",
    stage: "negotiation",
    value: 85000,
    probability: 60,
    created_date: "2024-12-01T09:00:00Z",
    updated_date: "2024-12-15T14:30:00Z",
    expected_close_date: "2025-01-15T00:00:00Z",
    sales_rep: "Tom Wilson",
    origin_city: "San Francisco, CA",
    destination_city: "Berlin, Germany",
    cargo_type: "Technology",
  },
  {
    deal_id: "RV-102",
    company_name: "Green Logistics Co",
    contact_name: "Emma Davis",
    transportation_mode: "trucking",
    stage: "proposal",
    value: 35000,
    probability: 30,
    created_date: "2024-12-10T11:15:00Z",
    updated_date: "2024-12-20T16:45:00Z",
    expected_close_date: "2025-01-20T00:00:00Z",
    sales_rep: "Jennifer Walsh",
    origin_city: "Portland, OR",
    destination_city: "Seattle, WA",
    cargo_type: "Organic Products",
  },
  {
    deal_id: "RV-103",
    company_name: "Ocean Freight International",
    contact_name: "Carlos Rodriguez",
    transportation_mode: "ocean",
    stage: "qualified",
    value: 120000,
    probability: 15,
    created_date: "2024-12-05T08:30:00Z",
    updated_date: "2024-12-18T10:15:00Z",
    expected_close_date: "2025-01-25T00:00:00Z",
    sales_rep: "Mike Rodriguez",
    origin_city: "Houston, TX",
    destination_city: "Rotterdam, Netherlands",
    cargo_type: "Oil & Gas Equipment",
  },

  // 2025 Q1 Deals - February
  {
    deal_id: "RV-201",
    company_name: "Rail Express Corp",
    contact_name: "Michael Chen",
    transportation_mode: "rail",
    stage: "negotiation",
    value: 55000,
    probability: 60,
    created_date: "2024-12-15T14:20:00Z",
    updated_date: "2024-12-28T09:45:00Z",
    expected_close_date: "2025-02-10T00:00:00Z",
    sales_rep: "Lisa Anderson",
    origin_city: "Chicago, IL",
    destination_city: "Dallas, TX",
    cargo_type: "Steel Products",
  },
  {
    deal_id: "RV-202",
    company_name: "FastTrack Trucking",
    contact_name: "Sarah Williams",
    transportation_mode: "trucking",
    stage: "prospect",
    value: 18000,
    probability: 5,
    created_date: "2024-12-20T13:45:00Z",
    updated_date: "2024-12-30T15:30:00Z",
    expected_close_date: "2025-02-15T00:00:00Z",
    sales_rep: "Jennifer Walsh",
    origin_city: "Nashville, TN",
    destination_city: "Memphis, TN",
    cargo_type: "Music Equipment",
  },
  {
    deal_id: "RV-203",
    company_name: "Global Air Cargo",
    contact_name: "David Kim",
    transportation_mode: "air",
    stage: "proposal",
    value: 95000,
    probability: 30,
    created_date: "2024-12-12T16:20:00Z",
    updated_date: "2024-12-25T10:45:00Z",
    expected_close_date: "2025-02-20T00:00:00Z",
    sales_rep: "Tom Wilson",
    origin_city: "Los Angeles, CA",
    destination_city: "Sydney, Australia",
    cargo_type: "Film Equipment",
  },

  // 2025 Q1 Deals - March (Q1 Push)
  {
    deal_id: "RV-301",
    company_name: "Mega Logistics Inc",
    contact_name: "Jennifer Lee",
    transportation_mode: "ocean",
    stage: "negotiation",
    value: 180000,
    probability: 60,
    created_date: "2024-12-01T09:00:00Z",
    updated_date: "2024-12-15T14:30:00Z",
    expected_close_date: "2025-03-05T00:00:00Z",
    sales_rep: "Mike Rodriguez",
    origin_city: "New York, NY",
    destination_city: "Hong Kong",
    cargo_type: "Luxury Goods",
  },
  {
    deal_id: "RV-302",
    company_name: "Express Rail Services",
    contact_name: "Robert Martinez",
    transportation_mode: "rail",
    stage: "proposal",
    value: 75000,
    probability: 30,
    created_date: "2024-12-10T11:15:00Z",
    updated_date: "2024-12-20T16:45:00Z",
    expected_close_date: "2025-03-10T00:00:00Z",
    sales_rep: "Lisa Anderson",
    origin_city: "Kansas City, MO",
    destination_city: "Denver, CO",
    cargo_type: "Agricultural Products",
  },
  {
    deal_id: "RV-303",
    company_name: "Premium Trucking Co",
    contact_name: "Amanda Foster",
    transportation_mode: "trucking",
    stage: "qualified",
    value: 42000,
    probability: 15,
    created_date: "2024-12-05T08:30:00Z",
    updated_date: "2024-12-18T10:15:00Z",
    expected_close_date: "2025-03-15T00:00:00Z",
    sales_rep: "Jennifer Walsh",
    origin_city: "Austin, TX",
    destination_city: "San Antonio, TX",
    cargo_type: "Technology Equipment",
  },
  {
    deal_id: "RV-304",
    company_name: "International Air Freight",
    contact_name: "Mark Thompson",
    transportation_mode: "air",
    stage: "negotiation",
    value: 110000,
    probability: 60,
    created_date: "2024-12-15T14:20:00Z",
    updated_date: "2024-12-28T09:45:00Z",
    expected_close_date: "2025-03-20T00:00:00Z",
    sales_rep: "Tom Wilson",
    origin_city: "Miami, FL",
    destination_city: "São Paulo, Brazil",
    cargo_type: "Pharmaceuticals",
  },

  // 2025 Q2 Deals - April
  {
    deal_id: "RV-401",
    company_name: "Coastal Shipping Solutions",
    contact_name: "Lisa Chen",
    transportation_mode: "ocean",
    stage: "prospect",
    value: 65000,
    probability: 5,
    created_date: "2024-12-20T13:45:00Z",
    updated_date: "2024-12-30T15:30:00Z",
    expected_close_date: "2025-04-10T00:00:00Z",
    sales_rep: "Mike Rodriguez",
    origin_city: "Charleston, SC",
    destination_city: "Hamburg, Germany",
    cargo_type: "Automotive Parts",
  },
  {
    deal_id: "RV-402",
    company_name: "Mountain Express",
    contact_name: "Kevin Johnson",
    transportation_mode: "trucking",
    stage: "proposal",
    value: 28000,
    probability: 30,
    created_date: "2024-12-12T16:20:00Z",
    updated_date: "2024-12-25T10:45:00Z",
    expected_close_date: "2025-04-15T00:00:00Z",
    sales_rep: "Jennifer Walsh",
    origin_city: "Salt Lake City, UT",
    destination_city: "Boise, ID",
    cargo_type: "Outdoor Equipment",
  },

  // 2025 Q2 Deals - May
  {
    deal_id: "RV-501",
    company_name: "Rail Logistics Pro",
    contact_name: "Rachel Green",
    transportation_mode: "rail",
    stage: "qualified",
    value: 45000,
    probability: 15,
    created_date: "2024-12-01T09:00:00Z",
    updated_date: "2024-12-15T14:30:00Z",
    expected_close_date: "2025-05-05T00:00:00Z",
    sales_rep: "Lisa Anderson",
    origin_city: "Detroit, MI",
    destination_city: "Cleveland, OH",
    cargo_type: "Automotive",
  },
  {
    deal_id: "RV-502",
    company_name: "Global Air Solutions",
    contact_name: "Daniel Brown",
    transportation_mode: "air",
    stage: "negotiation",
    value: 88000,
    probability: 60,
    created_date: "2024-12-10T11:15:00Z",
    updated_date: "2024-12-20T16:45:00Z",
    expected_close_date: "2025-05-10T00:00:00Z",
    sales_rep: "Tom Wilson",
    origin_city: "Boston, MA",
    destination_city: "Paris, France",
    cargo_type: "Fashion",
  },

  // 2025 Q2 Deals - June (Q2 Push)
  {
    deal_id: "RV-601",
    company_name: "Mega Ocean Freight",
    contact_name: "Stephanie Wong",
    transportation_mode: "ocean",
    stage: "negotiation",
    value: 220000,
    probability: 60,
    created_date: "2024-12-05T08:30:00Z",
    updated_date: "2024-12-18T10:15:00Z",
    expected_close_date: "2025-06-05T00:00:00Z",
    sales_rep: "Mike Rodriguez",
    origin_city: "Long Beach, CA",
    destination_city: "Singapore",
    cargo_type: "Electronics",
  },
  {
    deal_id: "RV-602",
    company_name: "Express Trucking Solutions",
    contact_name: "Chris Miller",
    transportation_mode: "trucking",
    stage: "proposal",
    value: 38000,
    probability: 30,
    created_date: "2024-12-15T14:20:00Z",
    updated_date: "2024-12-28T09:45:00Z",
    expected_close_date: "2025-06-10T00:00:00Z",
    sales_rep: "Jennifer Walsh",
    origin_city: "Charlotte, NC",
    destination_city: "Atlanta, GA",
    cargo_type: "Financial Documents",
  },
  {
    deal_id: "RV-603",
    company_name: "Premium Rail Services",
    contact_name: "Nicole Garcia",
    transportation_mode: "rail",
    stage: "qualified",
    value: 68000,
    probability: 15,
    created_date: "2024-12-20T13:45:00Z",
    updated_date: "2024-12-30T15:30:00Z",
    expected_close_date: "2025-06-15T00:00:00Z",
    sales_rep: "Lisa Anderson",
    origin_city: "Milwaukee, WI",
    destination_city: "Minneapolis, MN",
    cargo_type: "Beverages",
  },
  {
    deal_id: "RV-604",
    company_name: "International Cargo Express",
    contact_name: "Jason Lee",
    transportation_mode: "air",
    stage: "negotiation",
    value: 125000,
    probability: 60,
    created_date: "2024-12-12T16:20:00Z",
    updated_date: "2024-12-25T10:45:00Z",
    expected_close_date: "2025-06-20T00:00:00Z",
    sales_rep: "Tom Wilson",
    origin_city: "Seattle, WA",
    destination_city: "Tokyo, Japan",
    cargo_type: "Aerospace Parts",
  },

  // 2025 Q3 Deals - July
  {
    deal_id: "RV-701",
    company_name: "Summer Shipping Co",
    contact_name: "Maria Santos",
    transportation_mode: "ocean",
    stage: "prospect",
    value: 55000,
    probability: 5,
    created_date: "2024-12-01T09:00:00Z",
    updated_date: "2024-12-15T14:30:00Z",
    expected_close_date: "2025-07-10T00:00:00Z",
    sales_rep: "Mike Rodriguez",
    origin_city: "Savannah, GA",
    destination_city: "Barcelona, Spain",
    cargo_type: "Tourism Equipment",
  },
  {
    deal_id: "RV-702",
    company_name: "Vacation Logistics",
    contact_name: "Peter Anderson",
    transportation_mode: "trucking",
    stage: "proposal",
    value: 25000,
    probability: 30,
    created_date: "2024-12-10T11:15:00Z",
    updated_date: "2024-12-20T16:45:00Z",
    expected_close_date: "2025-07-15T00:00:00Z",
    sales_rep: "Jennifer Walsh",
    origin_city: "Orlando, FL",
    destination_city: "Miami, FL",
    cargo_type: "Tourism Supplies",
  },

  // 2025 Q3 Deals - August
  {
    deal_id: "RV-801",
    company_name: "Holiday Freight Services",
    contact_name: "Anna Rodriguez",
    transportation_mode: "air",
    stage: "qualified",
    value: 72000,
    probability: 15,
    created_date: "2024-12-05T08:30:00Z",
    updated_date: "2024-12-18T10:15:00Z",
    expected_close_date: "2025-08-05T00:00:00Z",
    sales_rep: "Tom Wilson",
    origin_city: "Las Vegas, NV",
    destination_city: "Vancouver, Canada",
    cargo_type: "Entertainment Equipment",
  },
  {
    deal_id: "RV-802",
    company_name: "Summer Rail Express",
    contact_name: "Mike Chen",
    transportation_mode: "rail",
    stage: "negotiation",
    value: 48000,
    probability: 60,
    created_date: "2024-12-15T14:20:00Z",
    updated_date: "2024-12-28T09:45:00Z",
    expected_close_date: "2025-08-10T00:00:00Z",
    sales_rep: "Lisa Anderson",
    origin_city: "Pittsburgh, PA",
    destination_city: "Philadelphia, PA",
    cargo_type: "Steel Products",
  },

  // 2025 Q3 Deals - September (Q3 Push)
  {
    deal_id: "RV-901",
    company_name: "Fall Shipping Solutions",
    contact_name: "David Wilson",
    transportation_mode: "ocean",
    stage: "negotiation",
    value: 160000,
    probability: 60,
    created_date: "2024-12-20T13:45:00Z",
    updated_date: "2024-12-30T15:30:00Z",
    expected_close_date: "2025-09-05T00:00:00Z",
    sales_rep: "Mike Rodriguez",
    origin_city: "New Orleans, LA",
    destination_city: "Marseille, France",
    cargo_type: "Agricultural Products",
  },
  {
    deal_id: "RV-902",
    company_name: "Back-to-School Logistics",
    contact_name: "Sarah Johnson",
    transportation_mode: "trucking",
    stage: "proposal",
    value: 32000,
    probability: 30,
    created_date: "2024-12-12T16:20:00Z",
    updated_date: "2024-12-25T10:45:00Z",
    expected_close_date: "2025-09-10T00:00:00Z",
    sales_rep: "Jennifer Walsh",
    origin_city: "Columbus, OH",
    destination_city: "Cincinnati, OH",
    cargo_type: "Educational Supplies",
  },
  {
    deal_id: "RV-903",
    company_name: "Q3 Rail Rush",
    contact_name: "Robert Davis",
    transportation_mode: "rail",
    stage: "qualified",
    value: 75000,
    probability: 15,
    created_date: "2024-12-01T09:00:00Z",
    updated_date: "2024-12-15T14:30:00Z",
    expected_close_date: "2025-09-15T00:00:00Z",
    sales_rep: "Lisa Anderson",
    origin_city: "St. Louis, MO",
    destination_city: "Kansas City, MO",
    cargo_type: "Manufacturing Equipment",
  },
  {
    deal_id: "RV-904",
    company_name: "Autumn Air Cargo",
    contact_name: "Jennifer Smith",
    transportation_mode: "air",
    stage: "negotiation",
    value: 98000,
    probability: 60,
    created_date: "2024-12-10T11:15:00Z",
    updated_date: "2024-12-20T16:45:00Z",
    expected_close_date: "2025-09-20T00:00:00Z",
    sales_rep: "Tom Wilson",
    origin_city: "Denver, CO",
    destination_city: "Calgary, Canada",
    cargo_type: "Outdoor Equipment",
  },

  // 2025 Q4 Deals - October
  {
    deal_id: "RV-1001",
    company_name: "Halloween Haulers",
    contact_name: "Tom Martinez",
    transportation_mode: "trucking",
    stage: "prospect",
    value: 22000,
    probability: 5,
    created_date: "2024-12-05T08:30:00Z",
    updated_date: "2024-12-18T10:15:00Z",
    expected_close_date: "2025-10-15T00:00:00Z",
    sales_rep: "Jennifer Walsh",
    origin_city: "Salem, MA",
    destination_city: "Providence, RI",
    cargo_type: "Costume Supplies",
  },
  {
    deal_id: "RV-1002",
    company_name: "October Ocean Freight",
    contact_name: "Lisa Brown",
    transportation_mode: "ocean",
    stage: "proposal",
    value: 85000,
    probability: 30,
    created_date: "2024-12-15T14:20:00Z",
    updated_date: "2024-12-28T09:45:00Z",
    expected_close_date: "2025-10-20T00:00:00Z",
    sales_rep: "Mike Rodriguez",
    origin_city: "Portland, ME",
    destination_city: "Dublin, Ireland",
    cargo_type: "Seafood",
  },

  // 2025 Q4 Deals - November
  {
    deal_id: "RV-1101",
    company_name: "Thanksgiving Transport",
    contact_name: "Amanda Lee",
    transportation_mode: "trucking",
    stage: "qualified",
    value: 35000,
    probability: 15,
    created_date: "2024-12-20T13:45:00Z",
    updated_date: "2024-12-30T15:30:00Z",
    expected_close_date: "2025-11-10T00:00:00Z",
    sales_rep: "Jennifer Walsh",
    origin_city: "Indianapolis, IN",
    destination_city: "Chicago, IL",
    cargo_type: "Food Products",
  },
  {
    deal_id: "RV-1102",
    company_name: "November Rail Services",
    contact_name: "Chris Johnson",
    transportation_mode: "rail",
    stage: "negotiation",
    value: 62000,
    probability: 60,
    created_date: "2024-12-12T16:20:00Z",
    updated_date: "2024-12-25T10:45:00Z",
    expected_close_date: "2025-11-15T00:00:00Z",
    sales_rep: "Lisa Anderson",
    origin_city: "Omaha, NE",
    destination_city: "Des Moines, IA",
    cargo_type: "Agricultural Products",
  },

  // 2025 Q4 Deals - December (Year-end Push)
  {
    deal_id: "RV-1201",
    company_name: "Year-End Mega Deal",
    contact_name: "CEO Johnson",
    transportation_mode: "ocean",
    stage: "negotiation",
    value: 350000,
    probability: 60,
    created_date: "2024-12-01T09:00:00Z",
    updated_date: "2024-12-15T14:30:00Z",
    expected_close_date: "2025-12-05T00:00:00Z",
    sales_rep: "Mike Rodriguez",
    origin_city: "Los Angeles, CA",
    destination_city: "Dubai, UAE",
    cargo_type: "Luxury Vehicles",
  },
  {
    deal_id: "RV-1202",
    company_name: "Holiday Express Cargo",
    contact_name: "Santa Claus",
    transportation_mode: "air",
    stage: "proposal",
    value: 150000,
    probability: 30,
    created_date: "2024-12-10T11:15:00Z",
    updated_date: "2024-12-20T16:45:00Z",
    expected_close_date: "2025-12-10T00:00:00Z",
    sales_rep: "Tom Wilson",
    origin_city: "North Pole, AK",
    destination_city: "London, UK",
    cargo_type: "Holiday Gifts",
  },
  {
    deal_id: "RV-1203",
    company_name: "December Dash Trucking",
    contact_name: "Rush Manager",
    transportation_mode: "trucking",
    stage: "qualified",
    value: 45000,
    probability: 15,
    created_date: "2024-12-05T08:30:00Z",
    updated_date: "2024-12-18T10:15:00Z",
    expected_close_date: "2025-12-15T00:00:00Z",
    sales_rep: "Jennifer Walsh",
    origin_city: "New York, NY",
    destination_city: "Boston, MA",
    cargo_type: "Last-Minute Gifts",
  },
  {
    deal_id: "RV-1204",
    company_name: "Year-End Rail Rush",
    contact_name: "Final Quarter Manager",
    transportation_mode: "rail",
    stage: "negotiation",
    value: 95000,
    probability: 60,
    created_date: "2024-12-15T14:20:00Z",
    updated_date: "2024-12-28T09:45:00Z",
    expected_close_date: "2025-12-20T00:00:00Z",
    sales_rep: "Lisa Anderson",
    origin_city: "Chicago, IL",
    destination_city: "Detroit, MI",
    cargo_type: "Automotive Parts",
  },
  {
    deal_id: "RV-1205",
    company_name: "Christmas Cargo Express",
    contact_name: "Holiday Coordinator",
    transportation_mode: "air",
    stage: "proposal",
    value: 180000,
    probability: 30,
    created_date: "2024-12-20T13:45:00Z",
    updated_date: "2024-12-30T15:30:00Z",
    expected_close_date: "2025-12-25T00:00:00Z",
    sales_rep: "Tom Wilson",
    origin_city: "Miami, FL",
    destination_city: "Rio de Janeiro, Brazil",
    cargo_type: "Holiday Celebrations",
  },
];

export async function POST() {
  try {
    const dataSource = await initializeDataSource();
    const dealRepository = dataSource.getRepository(Deal);

    // Clear existing data
    await dealRepository.clear();
    console.log("Cleared existing deals");

    // Insert sample data
    for (const dealData of sampleDeals) {
      const deal = dealRepository.create(dealData);
      await dealRepository.save(deal);
    }

    return NextResponse.json({
      message: `Successfully seeded ${sampleDeals.length} deals`,
      count: sampleDeals.length,
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
