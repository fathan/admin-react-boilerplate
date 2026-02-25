import { Breadcrumb } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

// Mapping segment ke nama manusia-friendly
const BREADCRUMB_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Users",
  settings: "Settings",
  profile: "Profile",
  // tambahkan segment lainnya sesuai routing app kamu
};

const formatSegment = (segment: string) => {
  return BREADCRUMB_LABELS[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
};

const UIBreadcrumbs = ({ separator = "/" }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean); // hapus empty string

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        {/* Home */}
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild>
            <Link to="/">Home</Link>
          </Breadcrumb.Link>
          {pathnames.length > 0 && <Breadcrumb.Separator>{separator}</Breadcrumb.Separator>}
        </Breadcrumb.Item>

        {pathnames.map((segment, index) => {
          const isLast = index === pathnames.length - 1;
          const to = "/" + pathnames.slice(0, index + 1).join("/");

          return (
            <Breadcrumb.Item key={to}>
              {isLast ? (
                <Breadcrumb.CurrentLink>{formatSegment(segment)}</Breadcrumb.CurrentLink>
              ) : (
                <>
                  <Breadcrumb.Link asChild>
                    <Link to={to}>{formatSegment(segment)}</Link>
                  </Breadcrumb.Link>
                  <Breadcrumb.Separator>{separator}</Breadcrumb.Separator>
                </>
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
};

export default UIBreadcrumbs;