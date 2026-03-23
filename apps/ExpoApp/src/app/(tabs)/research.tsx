import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";
import { useState } from "react";

import SearchBar from "@/components/research/searchbar";
import LoadingState from "@/components/research/loadingstate";
import EmptyState from "@/components/research/emptystate";
import ResultCard from "@/components/research/rescard";

export default function Research() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/research`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: query }),
        }
      );
      console.log("API URL:", process.env.EXPO_PUBLIC_API_URL);
 console.log(res);
 
      const data = await res.json();
  console.log(data);
  
      const blocks = data.data?.blocks || [];

      const formattedResults = blocks.map((block, index) => {
        if (block.type === "summary") {
          return {
            title: "📊 Summary",
            content: block.text,
          };
        }

        if (block.type === "key_points") {
          return {
            title: "🔑 Key Points",
            content: "• " + block.points.join("\n• "),
          };
        }

        if (block.type === "conclusion") {
          return {
            title: "✅ Conclusion",
            content: block.text,
          };
        }

        return {
          title: `Section ${index + 1}`,
          content: JSON.stringify(block),
        };
      });

      setResults(formattedResults);
    } catch (err) {
      console.log("ERROR:", err);

      setResults([
        {
          title: "Error",
          content: "Failed to fetch research data.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />

      <ScrollView style={{ marginTop: 15 }}>
        {loading && <LoadingState />}

        {!loading && results.length === 0 && <EmptyState />}

        {!loading &&
          results.map((item, index) => (
            <ResultCard
              key={index}
              title={item.title}
              content={item.content}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 15,
  },
});