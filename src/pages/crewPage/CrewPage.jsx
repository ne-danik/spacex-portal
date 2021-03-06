// hooks
import { useSearch } from "../../hooks/useSearch";
// components
import Search from "../../components/Search/Search";
import CrewList from "../../components/CrewList/CrewList";
import SearchResultCrew from "../../components/SearchResultCrew/SearchResultCrew";
// styles
import './crewPage.scss';

const CrewPage = ({ data }) => {
  const { searchValue, setSearchValue, setSearchParams, foundData } = useSearch(data, 'name');

  return (
    <>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setSearchParams={setSearchParams}
        placeholder={'Search member...'}
      />

      {searchValue.length ? (
        <SearchResultCrew data={foundData} searchValue={searchValue} />
      ) : (
        <CrewList data={foundData} />
      )}
    </>
  )
}

export default CrewPage;