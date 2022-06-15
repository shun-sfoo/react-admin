import qs from 'qs';
import { useEffect, useState } from 'react';
import { cleanObject, useDebounce, useMount } from '../../utils';
import { List } from './list';
import { SearchPanel } from './search-panel';

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });

  const debouncedParam = useDebounce(param);

  useEffect(() => {
    fetch(
      `${apiUrl}/api/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
