/* eslint-disable @typescript-eslint/no-explicit-any */
const url = import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

export type product = {
  _id: number,
  name: string,
  description: string,
  cover_image?: string,
  price: number,
  user: {_id: string, username: string}
}

export type meta = {
  current_page: number,
  from: number,
  last_page: number,
  path: string,
  per_page: number,
  to: number,
  total: number
}

export type result = {
  products: product[],
  meta: meta
}

type onFetchProductsProps = {
  page: string,
  from?: string,
  to?: string,
  sort?: string,
  searchString?: string
}

export async function onFetchProducts({ page, from, to, sort, searchString }: onFetchProductsProps): Promise<result | Error> {
  const finalurl = url + "/products"
    + (page ? "?page=" + page : "")
    + (from ? (page ? "&" : "?") + "from=" + from : "")
    + (to ? ((page || from) ? "&" : "?") + "to=" + to : "")
    + (sort ? ((page || from || to) ? "&" : "?") + "sort=" + sort : "")
    + (searchString ? ((page || from || to || sort) ? "&" : "?") + "searchString=" + searchString : "");

    console.log(searchString);

  try {
    const response = await fetch(finalurl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    };
    const result = await response.json();
    console.log(result);

    return result;
  } catch (error: any) {
    console.log(error)
    throw new Error((error));
  }
};

type onFetchProductProps = {
  id: string
}

export type productObj = {
  id: number,
  name: string,
  description: string,
  release_year: string,
  cover_image: string,
  images: string[],
  price: number,
  available_colors: string[],
  available_sizes: string[],
  brand: {
    id: number,
    name: string,
    image: string
  },
  total_price: number,
  quantity: number,
  color: string,
  size: string
}


export async function onFetchProduct({ id }: onFetchProductProps): Promise<productObj | Error> {

  const finalurl = url + "/products/" + id;

  try {
    const response = await fetch(finalurl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      }
    });
    if (!response.ok) {
      throw "something went wrong";
    };
    const result = await response.json();
    return result;
  } catch (error: any) {
    throw new Error((error));
  }
}



