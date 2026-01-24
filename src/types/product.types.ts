export type ApiProductListData = {
  products: ApiProduct[];
  total: number;
  limit: number;
  offset: number;
  filters: Record<string, unknown>;
};

export type ProductListParams = {
  category_id?: number;
  company_id?: number;
  search?: string;
  min_price?: number;
  max_price?: number;
  limit?: number;
  offset?: number;
};

export type ProductListResult = {
  products: Product[];
  total: number;
  limit: number;
  offset: number;
  filters: Record<string, unknown>;
};

export type ApiResponse<TData> = {
  success: boolean;
  status: number;
  message: string;
  timestamp: string;
  data: TData;
  error_code: string;
};
export type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string; 
};

export type ApiProduct = {
  id: number;
  name?: string;
  feature_bullet_points?: string;
  description?: string;
  list_price?: number;
  currency_id?: number;
  currency_name?: string;
  image_url?: string | null;

  company_id?: number | null;
  company_name?: string | null;

  seller_store_id?: number | null;
  seller_store_name?: string | null;

  categ_id?: number | null;
  category_name?: string | null;

  warranty?: string;
  country_of_origin_id?: number | null;
  country_of_origin_name?: string | null;

  model_number?: string;
  model_name?: string;

  sale_ok?: boolean;
  active?: boolean;

  item_condition?: string;
};

export type ApiProductDetails = ApiProduct & {
  default_code?: string;
  barcode?: string;
  standard_price?: number;
  weight?: number;
  volume?: number;
  qty_available?: number;
  uom_id?: number;
  uom_name?: string;
  is_published?: boolean;
  has_variants?: boolean;
  variant_count?: number;
  prod_features?: string;

  variants?: ApiProductVariant[];
  attribute_lines?: ApiAttributeLine[];
};

export type ApiProductVariant = {
  id: number;
  name?: string;
  default_code?: string;
  barcode?: string;
  list_price?: number;
  standard_price?: number;
  qty_available?: number;
  attribute_values?: ApiAttributeValue[];
};

export type ApiAttributeValue = {
  id?: number;
  name?: string;

  attribute_id?: number;
  attribute_name?: string;

  value_id?: number;
  value_name?: string;

  html_color?: string;
};

export type ApiAttributeLine = {
  attribute_id?: number;
  attribute_name?: string;

  values?: Array<{
    id: number;
    name: string;
    html_color?: string;
  }>;
};

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
};

export type ProductColor = {
  id: string;
  name: string;
  hex?: string;
};

export type ProductVariant = {
  id: string;
  colorId?: string;
  size?: string;
  stock: number;
};

export type Product = {
  id: string;

  name: string;

  description: string;
  featureBulletPointsHtml: string;

  price: number;
  currency: string;

  imageUrl: string | null;
  images: ProductImage[];

  colors?: ProductColor[];
  variants?: ProductVariant[];

  features: string[];
  specs: Record<string, string>;

  rating?: number;
  reviewCount?: number;

  badge?: "OFF" | "HOT" | "NEW";
  discountCount?: number | null;
  originalPrice?: number | null;

  categoryId?: number | null;
  categoryName?: string | null;

  subtitle?: string;
  img?: string;
  oldPrice?: number;
  badges?: string[];
};
