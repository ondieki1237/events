# Black November Featured Products

This document lists all the specific products featured in the Black November promotion.

## Product List (21 Products Total)

### Refrigeration & Cold Chain (2 products)
1. **Pharmacy Refrigerator (YC-315L)** - ID: 60
   - 315 liters capacity
2. **Blood Bank Refrigerator** - ID: 58

### Delivery & Maternity Equipment (3 products)
3. **Electric Obstetric Delivery Bed** - ID: 74
4. **Delivery Bed** - ID: 36
5. **Hydraulic Delivery Couch (T710)** - ID: 9
   - Gynae couch

### Operating Tables (1 product)
6. **Electric Operating Table (CH-T200)** - ID: 26

### Dental Equipment (3 products)
7. **Dental Chair (xh501)** - ID: 40
8. **Dental X-ray Unit** - ID: 89
9. **Orthopantomography (OPG) Dental X-Ray Unit** - ID: 132

### X-Ray & Imaging Equipment (5 products)
10. **X-Ray Machine** - ID: 148
11. **Digital X-Ray** - ID: 44
12. **Digital X-Ray Machine** - ID: 128
13. **C - Arm X-Ray Machine** - ID: 45
14. **Portable DR X-ray Machine** - ID: 152

### Hospital Beds (4 products)
15. **Electric Five Crank Bed With Mattress** - ID: 34
16. **Double Crank Bed With Mattress** - ID: 32
17. **Three Crank Bed With Mattress** - ID: 33
18. **Single Crank Bed With Mattress** - ID: 31

### Dialysis Equipment (2 products)
19. **Electric Dialysis Chair** - ID: 153
20. **Electric Dialysis Chair** (variant) - ID: 163

### Note:
Not found in database:
- Manual dialysis chair (no exact match found)

## Implementation

These products are now featured in:
1. **Hero Carousel** (`/components/black-november-carousel.tsx`) - Displays 12 products at a time in a 4x3 grid
2. **Offers Page** (`/app/offers/page.tsx`) - Shows all 21 products with search and filter options
3. **Product IDs List** (`/data/featured-products.tsx`) - Central configuration file

## Product Display Features

- Products with discounts show: discount percentage badge, original price, sale price, savings amount
- Products without discounts show: "Black November" badge and regular price
- All products are clickable and link to their detail pages
- Carousel auto-plays every 5 seconds
- Offers page has search and multiple sort options

## Search Terms Used

The following search terms were used to find these products:
- Fridge / Refrigerator
- Electric delivery bed / Delivery bed
- Gyna couch / Gynae couch / Hydraulic couch
- Operating table
- Dental
- Blood bank
- X-ray / Xray / X ray
- Dental X-ray
- Electric crank bed / Crank bed
- Dialysis chair

## Update Date
November 13, 2025
