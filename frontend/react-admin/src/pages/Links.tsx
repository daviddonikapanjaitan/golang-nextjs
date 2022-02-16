import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Layout from "../components/Layout";
import { Link } from "../models/link";
import axios from "axios";
import { useParams } from "react-router-dom";

const Links = (props: any) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [page, setPage] = useState(0);
  const perPage = 10;
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`users/${id}/links`);

      setLinks(data);
    })();
  }, []);

  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.slice(page * perPage, (page + 1) * perPage).map((link) => {
            return (
              <TableRow key={link.id}>
                <TableCell>{link.id}</TableCell>
                <TableCell>{link.code}</TableCell>
                <TableCell>{link.orders.length}</TableCell>
                <TableCell>
                  {link.orders.reduce((s, o) => s + o.total, 0)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableCell>
          <TablePagination
            count={links.length}
            page={page}
            onPageChange={(e: any, newPage: any) => setPage(newPage)}
            rowsPerPage={perPage}
            rowsPerPageOptions={[]}
          />
        </TableCell>
      </Table>
    </Layout>
  );
};

export default Links;
