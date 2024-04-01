import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    fontSize: "10px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexDirection: "column",
    // flexGrow: 1,
  },
  tableRow: {
    // display: "flex",
    // flexWrap: "wrap",
    flexDirection: "row",
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableCellHeader: {
    // width: "30%",
    // paddingRight: 5,
    borderBottomColor: "#000",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRightWidth: 0,
  },
  tableCellData: {
    // width: "fit-content",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 4,
    width: "100%",
    textAlign: "center",
  },
});

const MyDocument = ({ patient }) => {
  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ width: "100%", textAlign: "right", padding: 10 }}>
          <Text>{new Date().toLocaleString()}</Text>
        </View>
        <View style={styles.section}>
          {/* 1st row */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, { fontWeight: "bold" }]}>
              First Name:
            </Text>
            <Text style={styles.tableCellData}>{patient?.firstName}</Text>
          </View>

          {/* 2nd row */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, { fontWeight: "bold" }]}>
              Last Name:
            </Text>
            <Text style={styles.tableCellData}>{patient?.lastName}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, { fontWeight: "bold" }]}>
              Gender:
            </Text>
            <Text style={styles.tableCellData}>{patient?.gender}</Text>
          </View>

          {/* 3rd row */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, { fontWeight: "bold" }]}>
              Occupation:
            </Text>
            <Text style={styles.tableCellData}>
              {patient?.occupation || "-"}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, { fontWeight: "bold" }]}>
              Birthday:
            </Text>
            <Text style={styles.tableCellData}>
              {patient?.birthday ? formatDate(patient?.birthday) : "-"}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, { fontWeight: "bold" }]}>
              Age:
            </Text>
            <Text style={styles.tableCellData}>{patient?.age || "-"}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, { fontWeight: "bold" }]}>
              Contact Number:
            </Text>
            <Text style={styles.tableCellData}>
              {patient?.contactNumber || "-"}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, { fontWeight: "bold" }]}>
              Email Address:
            </Text>
            <Text style={styles.tableCellData}>{patient?.email || "-"}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, { fontWeight: "bold" }]}>
              Religion:
            </Text>
            <Text style={styles.tableCellData}>{patient?.religion || "-"}</Text>
          </View>

          {/* Add more rows for additional patient data if needed */}
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
