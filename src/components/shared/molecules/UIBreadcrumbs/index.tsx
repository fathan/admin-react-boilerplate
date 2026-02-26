import { Breadcrumb } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const BREADCRUMB_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Users",
  settings: "Settings",
  profile: "Profile",
};

const formatSegment = (segment: string) => {
  return (
    BREADCRUMB_LABELS[segment] ||
    segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  );
};

const UIBreadcrumbs = ({ separator = "/" }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        {/* Home */}
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild>
            <Link to="/">Home</Link>
          </Breadcrumb.Link>
        </Breadcrumb.Item>

        {pathnames.length > 0 && (
          <Breadcrumb.Separator>{separator}</Breadcrumb.Separator>
        )}

        {pathnames.map((segment, index) => {
          const isLast = index === pathnames.length - 1;
          const to = "/" + pathnames.slice(0, index + 1).join("/");

          return (
            <div key={to} style={{ display: "contents" }}>
              <Breadcrumb.Item>
                {isLast ? (
                  <Breadcrumb.CurrentLink>
                    {formatSegment(segment)}
                  </Breadcrumb.CurrentLink>
                ) : (
                  <Breadcrumb.Link asChild>
                    <Link to={to}>{formatSegment(segment)}</Link>
                  </Breadcrumb.Link>
                )}
              </Breadcrumb.Item>

              {!isLast && (
                <Breadcrumb.Separator>
                  {separator}
                </Breadcrumb.Separator>
              )}
            </div>
          );
        })}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
};

export default UIBreadcrumbs;