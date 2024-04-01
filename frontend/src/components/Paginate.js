import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, keyword = "" }) => {
  return (
    pages > 1 && (
      <div className="d-flex justify-content-center">
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={
                // keyword
                //   ? `/patients/page/${x + 1}/keyword/${keyword}`
                //   : `/patients/page/${x + 1}`
                keyword
                  ? `/search/page/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      </div>
    )
  );
};

export default Paginate;
