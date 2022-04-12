import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useGetProductsQuery, useMeQuery } from "../../graphql/generated/graphql";
import { getServerPageGetProducts, ssrGetProducts } from "../../graphql/generated/page";
import { withApollo } from "../../lib/withApollo";

function Home({ data }) {
    const { user } = useUser();
    const { data: me } = useMeQuery();
    // const { data, loading, error } = useGetProductsQuery();

    return (
        <div className="text-violet-500">
            <h1>Hello {user ? user.name : "World"}</h1>
            <pre>
                {JSON.stringify(me, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async (ctx) => {
        // console.log(getAccessToken(req, res));
        // return getServerPageGetProducts({}, ctx);
        return {
            props: {}
        }
    }
});

export default withApollo(
    ssrGetProducts.withPage()(Home)
);