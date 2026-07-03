import { useEffect, useState } from "react";
import API from "../api/api";
import AdminLayout from "../layouts/AdminLayout";
import { toast } from "react-toastify";

function Settings() {
  const [siteName, setSiteName] = useState("");
  const [defaultCategory, setDefaultCategory] = useState("");
  const [theme, setTheme] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await API.get("/settings");

      setSiteName(res.data.siteName);
      setDefaultCategory(res.data.defaultCategory);
      setTheme(res.data.theme);
    } catch (error) {
      console.log(error);
      toast.error("Error Loading Settings");
    }
  };

  const saveSettings = async () => {
    try {
      await API.put("/settings", {
        siteName,
        defaultCategory,
        theme,
      });

      toast.success("Settings Saved Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error Saving Settings");
    }
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h2 className="mb-4">⚙ Settings</h2>

        <div className="card shadow p-4">

          <div className="mb-3">
            <label className="form-label">Site Name</label>

            <input
              type="text"
              className="form-control"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Default Category</label>

            <select
              className="form-select"
              value={defaultCategory}
              onChange={(e) => setDefaultCategory(e.target.value)}
            >
              <option value="Technology">Technology</option>
              <option value="Programming">Programming</option>
              <option value="AI">AI</option>
              <option value="Web Development">Web Development</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label">Theme</label>

            <select
              className="form-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">🌞 Light</option>
              <option value="dark">🌙 Dark</option>
            </select>
          </div>

          <button
            className="btn btn-primary"
            onClick={saveSettings}
          >
            Save Settings
          </button>

        </div>
      </div>
    </AdminLayout>
  );
}

export default Settings;