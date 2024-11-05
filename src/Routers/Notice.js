import { Add, Search } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
	createColumnHelper,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useState } from "react";
import Table from "../Component/Table";
import NoticeList from "../Data/NoticeList.json";

dayjs.extend(isSameOrBefore);

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
}));

const Notice = () => {
  const [data, setData] = useState([...NoticeList]);
  const [datevalue, setDateValue] = useState(null);
  const [searchvalue, setSearchValue] = useState("title");
  const [searchWord, setSearchWord] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const onSearch = () => {
    var list = [];
    NoticeList.map((item) => {
      if (datevalue != null) {
        if (datevalue.isSameOrBefore(dayjs(item.date)) == true) {
          list.push(item);
        }
      } else {
        list.push(item);
      }
    });
    const datas = list.filter((item) => {
      if (searchvalue == "title") {
        return item.title.toUpperCase().includes(searchWord.toUpperCase());
      } else if (searchvalue == "person") {
        return item.person.toUpperCase().includes(searchWord.toUpperCase());
      }
    });
    setData(datas);
  };

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", { header: "ID" }),
    columnHelper.accessor("title", { header: "제목" }),
    columnHelper.accessor("person", { header: "작성자" }),
    columnHelper.accessor("date", { header: "작성일" }),
  ];
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "30px",
          flexDirection: "column",
        }}
      >
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Item sx={{ backgroundColor: "#80808052" }}>
            <Grid container spacing={2}>
              <Grid size={{ md: 12, lg: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subTitle1"
                    sx={{
                      fontWeight: 600,
                      paddingRight: "10px",
                      wordBreak: "keep-all",
                    }}
                  >
                    등록일 기준
                  </Typography>
                  <DatePicker
                    value={datevalue}
                    onChange={(newValue) => setDateValue(newValue)}
                  />
                </Box>
              </Grid>
              <Grid size={{ md: 12, lg: 9 }}>
                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subTitle1"
                    sx={{
                      fontWeight: 600,
                      paddingRight: "10px",
                      wordBreak: "keep-all",
                    }}
                  >
                    검색 조건
                  </Typography>
                  <Box>
                    <Select
                      value={searchvalue}
                      onChange={handleSearchChange}
                      sx={{
                        width: "10%",
                        minWidth: "100px",
                        marginRight: "10px",
                      }}
                    >
                      <MenuItem value={"title"}>제목</MenuItem>
                      <MenuItem value={"person"}>작성자</MenuItem>
                    </Select>
                    <TextField
                      value={searchWord}
                      onChange={(event) => {
                        setSearchWord(event.target.value);
                      }}
                      sx={{ paddingRight: "10px" }}
                      placeholder="검색어를 입력해주세요."
                    />
                  </Box>
                  <IconButton aria-label="Search" onClick={() => onSearch()}>
                    <Search />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Item>
        </Stack>
        <Divider />
        <Box
          sx={{
            display: "flex",
            padding: "10px 0px",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                wordBreak: "keep-all",
                display: "flex",
                alignItems: "center",
              }}
            >
              전체 글
            </Typography>
            <Avatar sx={{ bgcolor: "gray", marginLeft: "5px" }}>
              {NoticeList.length}
            </Avatar>
          </Box>
          <Box>
            <Button variant="contained" startIcon={<Add />}>
              등록
            </Button>
          </Box>
        </Box>
        <Table table={table} />
      </Box>
    </LocalizationProvider>
  );
};

export default Notice;
