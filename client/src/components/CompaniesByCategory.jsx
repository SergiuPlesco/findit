import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  companiesByCategory,
  error,
  isLoading,
} from "../redux/slices/CompaniesByCategorySlice";
import { getCompaniesByCategory } from "../redux/services/PublicServices";
import Categories from "./partials/content/Categories";

const CompaniesByCategory = () => {
  const dispatch = useDispatch();
  const { city, category } = useParams();

  useEffect(() => {
    dispatch(getCompaniesByCategory({ city, category }));
  }, [city, category, dispatch]);

  const companies = useSelector(companiesByCategory);
  const companiesError = useSelector(error);
  const companiesIsLoading = useSelector(isLoading);

  return (
    <>
      <Categories />
      <div>
        {companiesError && <div>{companiesError}</div>}
        {companiesIsLoading && <div>Companies loading...</div>}
        {companies.length > 0 && (
          <div>
            {companies.map((company) => {
              return (
                <div className="result-container" key={company}>
                  <Link
                    className="result-container_link"
                    to={`/${city}/brand/${company.name}`}
                  >
                    <div className="result-container_link_content">
                      <div className="result-container_link_image-wrapper">
                        <img
                          className="result-container_link_image"
                          src={`${import.meta.env.VITE_IMAGES_URL}/${
                            company.logoImage
                          }`}
                          alt=""
                        />
                      </div>
                      <div>
                        <h3 className="result-container_link-title">
                          {company.name}
                        </h3>
                        <p className="result-container_link-category">
                          {company.category}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        {companies.length === 0 && !companiesIsLoading && (
          <div>
            <p>There are no companies registered in {category} category</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CompaniesByCategory;
